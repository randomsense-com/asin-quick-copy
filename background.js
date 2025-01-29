chrome.commands.onCommand.addListener(async (command) => {
  if (command === "copy") {
    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: async () => {
          const asin = location.pathname.match(/\/([A-Z0-9]{10})(?:[/?]|$)/)?.[1] 
            || document.querySelector('[data-asin]')?.getAttribute('data-asin');
          
          if (!asin) {
            alert('ASIN Not Found');
            return;
          }

          try {
            await navigator.clipboard.writeText(asin);
            alert('ASIN Copy Success ' + asin);
          } catch (err) {
            alert('ASIN Copy Failed ' + err);
          }
        }
      });
    } catch (err) {
      console.error('Script execution failed:', err);
    }
  }
});