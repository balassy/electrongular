import { app, BrowserWindow } from 'electron';
import { enableLiveReload } from 'electron-compile';

// Keep a global reference of the window object.
// If you don't, the window will be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | undefined;

const isDevMode: boolean = !process.execPath.match(/[\\/]Electrongular/);

if (isDevMode) {
  enableLiveReload();
}

const createWindow: () => void = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    height: 600,
    width: 800
  });

  // Load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
};

// This method will be called when Electron has finished initialization, and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app, when the dock icon is clicked and there are no other windows open.
  if (!mainWindow) {
    createWindow();
  }
});
