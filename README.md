# Describe Image

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/your-extension-id)](https://chrome.google.com/webstore/detail/your-extension-id)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT-4-412991)](https://openai.com)

A Chrome extension that uses OpenAI's GPT-4 Vision model to provide detailed descriptions of images on any webpage. Simply right-click on an image and get an AI-powered description instantly.

## Features

- 🔍 Instant image analysis using GPT-4 Vision
- 🖼️ Works on any image across the web
- ⚡ Fast and efficient processing
- 🔒 Secure API key storage
- 🎨 Clean, modern Google Material Design interface

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/describe-image.git
   ```

2. Install dependencies:

   ```bash
   cd describe-image
   npm install
   ```

3. Build the extension:

   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder from this project

## Usage

1. Get your OpenAI API key from [OpenAI's website](https://platform.openai.com/api-keys)
2. Click the extension icon and enter your API key
3. Right-click on any image on a webpage
4. Select "Describe Image" from the context menu
5. View the AI-generated description in the popup window

## Development

This extension is built with:

- React
- Chrome Extension Manifest V3
- OpenAI GPT-4 Vision API
- Google Material Design

### Project Structure

```
describe-image/
├── src/
│   ├── popup/          # Extension popup UI
│   ├── background/     # Background service worker
│   ├── content/        # Content scripts
│   └── utils/          # Shared utilities
├── public/             # Static assets
└── manifest.json       # Extension manifest
```

### Building

```bash
# Development build
npm run dev

# Production build
npm run build
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 Vision API
- Google for the Material Design guidelines
- The Chrome Extensions team for Manifest V3

## Support

If you encounter any issues or have questions, please:

1. Check our [FAQ](FAQ.md)
2. Open an issue on GitHub
3. Contact us at support@describe-image.com

---

Made with ❤️ by [Your Name/Organization]
