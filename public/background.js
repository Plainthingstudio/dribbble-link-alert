// Background script for Chrome extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // Open popup or perform action
  console.log('Extension clicked');
});