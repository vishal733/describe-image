# Describe Image - Chrome Extension

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/your-extension-id)](https://chrome.google.com/webstore/detail/your-extension-id)
[![License](https://img.shields.io/github/license/vishal733/describe-image)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A powerful Chrome extension that uses ChatGPT to provide detailed descriptions of any image on the web. Simply right-click on any image and get an AI-powered description instantly.

## ✨ Features

- 🔍 Right-click any image to get an AI description
- 🤖 Powered by ChatGPT's Vision API
- 🚀 Fast and easy to use
- 💾 Secure API key storage
- 🎨 Clean and intuitive interface
- 🌐 Works on any website

## 🚀 Installation

### Manual Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/vishal733/describe-image.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder

## 🔑 Setup

1. Click the extension icon in your Chrome toolbar
2. Enter your OpenAI API key
3. Click "Save API Key"
4. You're ready to use the extension!

## 🎯 Usage

1. Right-click on any image on a webpage
2. Select "Describe this image with ChatGPT"
3. Wait for the AI to analyze the image
4. View the description in a floating box
5. Click the × button to close the description

## 🛠️ Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Chrome browser

### Building for Development

```bash
# Install dependencies
npm install

# Start development mode with watch
npm run watch

# Build for production
npm run build
```

### Project Structure

```
describe-image/
├── src/
│   ├── popup/          # Extension popup UI
│   ├── background/     # Background service worker
│   └── content/        # Content script
├── public/             # Static files
├── icons/             # Extension icons
├── dist/              # Built extension files
└── manifest.json      # Extension manifest
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

- Your OpenAI API key is stored securely in Chrome's local storage
- No data is sent to any servers except OpenAI's API
- The extension only has access to images you explicitly choose to describe

## 🙏 Acknowledgments

- OpenAI for providing the ChatGPT Vision API
- React team for the amazing framework
- All contributors who help improve this extension

## 📞 Support

If you encounter any issues or have suggestions, please:

1. Check the [Issues](https://github.com/vishal733/describe-image/issues) page
2. Create a new issue if needed
3. Include as much detail as possible about the problem

## 📈 Roadmap

- [ ] Add support for multiple languages
- [ ] Implement image editing capabilities
- [ ] Add batch image processing
- [ ] Support for video frames
- [ ] Custom prompt templates

## 📱 Screenshots

[Add screenshots of your extension in action]

---

Made with ❤️ by [Kumar Vishal](https://github.com/vishal733)
