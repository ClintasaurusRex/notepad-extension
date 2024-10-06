document.addEventListener("DOMContentLoaded", function () {
  const notesTextArea = document.getElementById("notes");
  const saveButton = document.getElementById("saveBtn");

  // Retrieve the current tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;

    // Load saved note for the current URL
    chrome.storage.local.get([currentUrl], function (result) {
      if (result[currentUrl]) {
        notesTextArea.value = result[currentUrl];
      }
    });

    // Save note when button is clicked
    saveButton.addEventListener("click", function () {
      const note = notesTextArea.value;
      chrome.storage.local.set({ [currentUrl]: note }, function () {
        alert("Note saved!");
      });
    });
  });
});
