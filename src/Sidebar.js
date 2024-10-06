import React, { useState, useEffect } from "react";
const Sidebar = () => {
    const [note, setNote] = useState("");
    const [url, setUrl] = useState("");
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
    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };
    const saveNote = () => {
        if (url) {
            chrome.storage.local.set({ [url]: note }, () => {
                console.log("Note saved!");
            });
        }
    };
    return (React.createElement("div", null,
        React.createElement("h2", null, "Context-Aware Notepad"),
        React.createElement("p", null,
            "URL: ",
            url),
        React.createElement("textarea", { value: note, onChange: handleNoteChange, placeholder: "Take notes...", rows: 8, cols: 30 }),
        React.createElement("br", null),
        React.createElement("button", { onClick: saveNote }, "Save Note")));
};
export default Sidebar;
