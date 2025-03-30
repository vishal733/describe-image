// Content script
console.log("Content script loaded");

// Create a floating description box
const descriptionBox = document.createElement("div");
descriptionBox.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 300px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 10000;
  display: none;
  font-family: Arial, sans-serif;
  color: #333;
`;
document.body.appendChild(descriptionBox);

// Create loading spinner
const loadingSpinner = document.createElement("div");
loadingSpinner.className = "loading-spinner";
loadingSpinner.style.cssText = `
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 10000;
`;

// Add loading spinner styles
const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .extension-highlight {
    background-color: yellow;
    padding: 2px;
  }
`;
document.head.appendChild(style);

// Add loading spinner to page
document.body.appendChild(loadingSpinner);

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_IMAGE_DATA") {
    // Show loading spinner
    loadingSpinner.style.display = "block";
    descriptionBox.style.display = "none";

    // Fetch the image and convert to base64
    fetch(message.imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result.split(",")[1];
          // Send base64 data back to background script
          chrome.runtime.sendMessage({
            type: "IMAGE_DATA",
            imageData: base64data,
          });
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        showError("Failed to process image");
        loadingSpinner.style.display = "none";
      });
  } else if (message.type === "SHOW_DESCRIPTION") {
    loadingSpinner.style.display = "none";
    showDescription(message.description);
  } else if (message.type === "SHOW_ERROR") {
    loadingSpinner.style.display = "none";
    showError(message.error);
  }
});

function showDescription(text) {
  descriptionBox.textContent = text;
  descriptionBox.style.display = "block";

  // Add close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  closeButton.className = "close-button";
  closeButton.style.cssText = `
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    background: #ff4444;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0 5px;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  `;
  closeButton.onmouseover = () => {
    closeButton.style.background = "#cc0000";
  };
  closeButton.onmouseout = () => {
    closeButton.style.background = "#ff4444";
  };
  closeButton.onclick = () => {
    descriptionBox.style.display = "none";
  };
  descriptionBox.appendChild(closeButton);
}

function showError(error) {
  descriptionBox.textContent = `Error: ${error}`;
  descriptionBox.style.display = "block";
  descriptionBox.style.backgroundColor = "#ffebee";
  descriptionBox.style.color = "#c62828";

  // Add close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  closeButton.className = "close-button";
  closeButton.style.cssText = `
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    background: #ff4444;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0 5px;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  `;
  closeButton.onmouseover = () => {
    closeButton.style.background = "#cc0000";
  };
  closeButton.onmouseout = () => {
    closeButton.style.background = "#ff4444";
  };
  closeButton.onclick = () => {
    descriptionBox.style.display = "none";
  };
  descriptionBox.appendChild(closeButton);
}
