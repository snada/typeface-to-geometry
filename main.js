import electron from 'electron';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// import installExtension, {
//     REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS
// } from 'electron-devtools-installer'
//
// installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name) => console.log(`Added Extension:  ${name}`))
//     .catch((err) => console.log('An error occurred: ', err))
//
// installExtension(REDUX_DEVTOOLS)
//     .then((name) => console.log(`Added Extension:  ${name}`))
//     .catch((err) => console.log('An error occurred: ', err))


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 260,
    minHeight: 587,
    show: false
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
