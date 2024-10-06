"use strict";
chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome Extension installed.");
});
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "openNotepad",
        title: "Open Notepad",
        contexts: ["all"],
    });
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openNotepad") {
        chrome.action.openPopup();
    }
});
