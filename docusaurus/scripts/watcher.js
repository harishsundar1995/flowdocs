const syncContent = require('./syncContent.js');

async function startWatcher() {
  console.log('Starting Strapi content watcher...');

  setInterval(async () => {
    try {
      console.log('Checking for updates...');
      await syncContent();
    } catch (error) {
      console.error('Watcher error:', error);
    }
  }, 10000); // Check every 10 seconds
}

startWatcher();
