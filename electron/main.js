const { app, BrowserWindow, shell, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../src/electron/preload.js'),
      contextIsolation: true
    }
  });

  // Load React dev server in dev, or built files in prod:
  const startUrl = process.env.ELECTRON_START_URL || 'https://localhost:3000';
  win.loadURL(startUrl);

  // Open external links in the default browser (esp. Spotify authorize)
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  // Optional: disable insecure content in production
  session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
    cb({ responseHeaders: { ...details.responseHeaders } });
  });
  createWindow();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
