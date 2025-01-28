chrome.commands.onCommand.addListener((command) => {
  if (command === "copy") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: () => {
          const asin = location.pathname.match(/\/([A-Z0-9]{10})(?:[/?]|$)/)?.[1] 
            || document.querySelector('[data-asin]')?.getAttribute('data-asin');
          
          if (!asin) {
            alert('ASIN Not Found');
            return;
          }

          navigator.clipboard.writeText(asin)
            .then(() => alert('ASIN Copy Success ' + asin))
            .catch(err => alert('ASIN Copy Failed ' + err));
        }
      }).catch(err => console.error('Script execution failed:', err));
    });
  }
});