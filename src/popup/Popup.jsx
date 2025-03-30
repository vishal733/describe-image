import React, { useState, useEffect } from 'react';

const Popup = () => {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Load API key from storage
    chrome.storage.local.get(['openai_api_key'], (result) => {
      if (result.openai_api_key) {
        setApiKey(result.openai_api_key);
        setStatus('API key loaded');
      }
    });
  }, []);

  const handleSave = () => {
    chrome.storage.local.set({ openai_api_key: apiKey }, () => {
      setStatus('API key saved!');
    });
  };

  return (
    <div className="popup-container">
      <h1>Image Description Extension</h1>
      <div className="api-key-section">
        <h2>OpenAI API Key</h2>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
        />
        <button onClick={handleSave}>Save API Key</button>
        {status && <p className="status">{status}</p>}
      </div>
      <div className="instructions">
        <h2>How to Use</h2>
        <ol>
          <li>Enter your OpenAI API key above and save it</li>
          <li>Right-click on any image on a webpage</li>
          <li>Select "Describe this image with ChatGPT"</li>
          <li>The description will appear in a floating box</li>
        </ol>
      </div>
    </div>
  );
};

export default Popup; 