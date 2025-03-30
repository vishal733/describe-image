# React Chrome Extension

A Chrome extension built with React using Manifest V3.

## Features

- React-based popup interface
- Background service worker
- Content script integration
- Chrome storage API integration
- Webpack bundling

## Setup

1. Install dependencies:

```bash
npm install
```

2. Build the extension:

```bash
npm run build
```

3. Load the extension in Chrome:

- Open Chrome and navigate to `chrome://extensions/`
- Enable "Developer mode" in the top right
- Click "Load unpacked" and select the `dist` folder

## Development

To watch for changes during development:

```bash
npm run watch
```

## Project Structure

- `src/popup/` - Popup UI components
- `src/background/` - Background service worker
- `src/content/` - Content script
- `public/` - Static files
- `dist/` - Built extension files

## Features

- Counter with persistent storage
- Message passing between content script and background
- Basic page modification through content script
