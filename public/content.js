// Content script for Dribbble Link Alert
console.log('Dribbble Link Alert content script loaded');

// Only run on Dribbble message pages
if (window.location.hostname === 'dribbble.com' && 
    (window.location.pathname.includes('/messages') || 
     window.location.pathname.includes('/inbox'))) {
  
  let alertElement = null;
  
  // URL detection regex
  const urlRegex = /https?:\/\/[^\s]+/gi;
  
  // Create warning popup
  function createWarningPopup() {
    if (alertElement) return alertElement;
    
    alertElement = document.createElement('div');
    alertElement.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #fee2e2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 14px;
        color: #dc2626;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
      ">
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">Link Detected!</div>
            <div style="font-size: 12px; opacity: 0.8;">Links are often flagged—double check before sending.</div>
          </div>
          <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #dc2626;
            padding: 0;
            margin-left: auto;
          ">×</button>
        </div>
      </div>
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alertElement);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (alertElement && alertElement.parentNode) {
        alertElement.remove();
        alertElement = null;
      }
    }, 5000);
    
    return alertElement;
  }
  
  // Check for URLs in text
  function checkForUrls(text) {
    return urlRegex.test(text);
  }
  
  // Monitor input fields
  function monitorInputs() {
    // Look for common message input selectors
    const selectors = [
      'textarea[placeholder*="message"]',
      'textarea[placeholder*="Message"]',
      '[contenteditable="true"]',
      'input[type="text"]',
      'textarea',
      '.message-input',
      '.composer-input',
      '.text-input'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element.dataset.dribbbleMonitored) return;
        element.dataset.dribbbleMonitored = 'true';
        
        // Monitor typing
        element.addEventListener('input', (e) => {
          const text = e.target.value || e.target.textContent || '';
          if (checkForUrls(text)) {
            createWarningPopup();
          }
        });
        
        // Monitor pasting
        element.addEventListener('paste', (e) => {
          setTimeout(() => {
            const text = e.target.value || e.target.textContent || '';
            if (checkForUrls(text)) {
              createWarningPopup();
            }
          }, 100);
        });
      });
    });
  }
  
  // Initial monitoring
  monitorInputs();
  
  // Monitor for dynamically added elements
  const observer = new MutationObserver(() => {
    monitorInputs();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  console.log('Dribbble Link Alert: Monitoring message inputs for URLs');
}