import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
    const [note, setNote] = useState("");
    const [url, setUrl] = useState("");
    // Get the current tab's URL when the component mounts
    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.url) {
                const currentUrl = new URL(tabs[0].url);
                setUrl(currentUrl.href);
                // Fetch the note associated with the current URL
                chrome.storage.local.get([currentUrl.href], (result) => {
                    if (result[currentUrl.href]) {
                        setNote(result[currentUrl.href]);
                    }
                });
            }
        });
    }, []);
    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };
    const saveNote = () => {
        if (url) {
            chrome.storage.local.set({ [url]: note }, () => {
                console.log(`Note saved for ${url}`);
            });
        }
    };
    return (React.createElement("div", null,
        React.createElement("h1", null, "Notepad"),
        React.createElement("p", null,
            "URL: ",
            url),
        React.createElement("textarea", { value: note, onChange: handleNoteChange, placeholder: "Take notes...", rows: 8, cols: 40 }),
        React.createElement("br", null),
        React.createElement("button", { onClick: saveNote }, "Save Note")));
};
export default App;
