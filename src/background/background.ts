"use strict";

chrome.runtime.onInstalled.addListener((): void => {
  console.log("Chrome Extension installed.");
});

chrome.runtime.onInstalled.addListener((): void => {
  chrome.contextMenus.create({
    id: "openNotepad",
    title: "Open Notepad",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener(
  (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): void => {
    if (info.menuItemId === "openNotepad") {
      chrome.action.openPopup();
    }
  }
);
