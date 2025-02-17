
// Theme configurations
const themes = {
  Happy: {
    colors: {
      frame: [255, 217, 61],
      toolbar: [255, 217, 61, 0.9],
      tab_background_text: [0, 0, 0],
    }
  },
  Calm: {
    colors: {
      frame: [149, 225, 211],
      toolbar: [149, 225, 211, 0.9],
      tab_background_text: [0, 0, 0],
    }
  },
  Focused: {
    colors: {
      frame: [168, 230, 207],
      toolbar: [168, 230, 207, 0.9],
      tab_background_text: [0, 0, 0],
    }
  },
  Energetic: {
    colors: {
      frame: [255, 107, 107],
      toolbar: [255, 107, 107, 0.9],
      tab_background_text: [255, 255, 255],
    }
  },
  Relaxed: {
    colors: {
      frame: [184, 198, 219],
      toolbar: [184, 198, 219, 0.9],
      tab_background_text: [0, 0, 0],
    }
  }
};

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SET_THEME') {
    const theme = themes[message.themeName];
    if (theme) {
      chrome.theme.getCurrent().then(currentTheme => {
        chrome.theme.update({ ...currentTheme, ...theme });
      });
    }
    sendResponse({ success: true });
  }
  return true;
});

// Handle automatic theme changes based on time
function updateTimeBasedTheme() {
  chrome.storage.local.get(['timeBasedEnabled'], (result) => {
    if (result.timeBasedEnabled) {
      const hour = new Date().getHours();
      let themeName;
      
      if (hour >= 5 && hour < 12) {
        themeName = 'Energetic'; // Morning
      } else if (hour >= 12 && hour < 17) {
        themeName = 'Focused'; // Afternoon
      } else if (hour >= 17 && hour < 22) {
        themeName = 'Relaxed'; // Evening
      } else {
        themeName = 'Calm'; // Night
      }
      
      const theme = themes[themeName];
      if (theme) {
        chrome.theme.update(theme);
      }
    }
  });
}

// Check for time-based changes every hour
setInterval(updateTimeBasedTheme, 3600000);
updateTimeBasedTheme();
