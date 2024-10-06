import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const Sidebar: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        const currentUrl = new URL(tabs[0].url);
        setUrl(currentUrl.href);

        chrome.storage.local.get([currentUrl.href], (result) => {
          if (result[currentUrl.href]) {
            setNote(result[currentUrl.href]);
          }
        });
      }
    });
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const saveNote = () => {
    if (url) {
      chrome.storage.local.set({ [url]: note }, () => {
        console.log("Note saved!");
      });
    }
  };

  return (
    <div>
      <h2>Context-Aware Notepad</h2>
      <p>URL: {url}</p>
      <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Take notes..."
        rows={8}
        cols={30}
      />
      <br />
      <button onClick={saveNote}>Save Note</button>
    </div>
  );
};

export default Sidebar;
