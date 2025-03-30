import React, { useState, useEffect } from 'react';
import './styles.css';

const Popup = () => {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load API key from local storage
    chrome.storage.local.get(['apiKey'], (result) => {
      if (result.apiKey) {
        setApiKey(result.apiKey);
        setStatus('API key loaded successfully');
      }
    });
  }, []);

  const handleSaveApiKey = async () => {
    setIsLoading(true);
    try {
      await chrome.storage.local.set({ apiKey });
      setStatus('API key saved successfully');
    } catch (error) {
      setStatus('Error saving API key');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="popup-container">
      <button className="close-button" onClick={() => window.close()}>×</button>
      <h1>Describe Image</h1>
      
      <div className="api-key-section">
        <h2>OpenAI API Key</h2>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
        />
        <button 
          onClick={handleSaveApiKey}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save API Key'}
        </button>
        {status && <div className="status">{status}</div>}
      </div>

      <div className="instructions">
        <h2>How to Use</h2>
        <ol>
          <li>Right-click on any image on a webpage</li>
          <li>Select "Describe Image" from the context menu</li>
          <li>Wait for the AI to analyze the image</li>
          <li>View the description in the popup window</li>
        </ol>
      </div>
    </div>
  );
};

export default Popup; 