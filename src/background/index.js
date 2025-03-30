// Background script
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  chrome.contextMenus.create({
    id: "describeImage",
    title: "Describe this image with ChatGPT",
    contexts: ["image"],
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "describeImage") {
    // Get the image URL
    const imageUrl = info.srcUrl;

    // First, inject the content script if it's not already injected
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      })
      .then(() => {
        // Then send message to content script
        chrome.tabs
          .sendMessage(tab.id, {
            type: "GET_IMAGE_DATA",
            imageUrl: imageUrl,
          })
          .catch((error) => {
            console.error("Error sending message to content script:", error);
            // If the message fails, try injecting the script again
            chrome.scripting
              .executeScript({
                target: { tabId: tab.id },
                files: ["content.js"],
              })
              .then(() => {
                // Try sending the message again
                chrome.tabs.sendMessage(tab.id, {
                  type: "GET_IMAGE_DATA",
                  imageUrl: imageUrl,
                });
              });
          });
      });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "IMAGE_DATA") {
    // Call ChatGPT API
    callChatGPTAPI(message.imageData)
      .then((description) => {
        // Send description back to content script
        chrome.tabs
          .sendMessage(sender.tab.id, {
            type: "SHOW_DESCRIPTION",
            description: description,
          })
          .catch((error) => {
            console.error(
              "Error sending description to content script:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Error calling ChatGPT API:", error);
        chrome.tabs
          .sendMessage(sender.tab.id, {
            type: "SHOW_ERROR",
            error: error.message || "Failed to get image description",
          })
          .catch((error) => {
            console.error("Error sending error to content script:", error);
          });
      });
    return true; // Keep the message channel open for async response
  }
});

async function callChatGPTAPI(base64Image) {
  const apiKey = await getAPIKey();
  if (!apiKey) {
    throw new Error("API key not found. Please set it in the extension popup.");
  }

  console.log("Making API call with key length:", apiKey.length);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please describe this image in detail.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(
        `API call failed: ${response.status} ${
          response.statusText
        } - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Detailed API Error:", error);
    throw error;
  }
}

async function getAPIKey() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["openai_api_key"], (result) => {
      console.log(
        "Retrieved API key:",
        result.openai_api_key ? "Present" : "Missing"
      );
      resolve(result.openai_api_key);
    });
  });
}
