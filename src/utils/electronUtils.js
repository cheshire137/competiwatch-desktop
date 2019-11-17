import isElectron from 'is-electron';

export function setTitle(title) {
  if (isElectron()) {
    window.ipcRenderer.send('title', title);
  }
};

export function showSaveDialog(options, handler) {
  if (isElectron()) {
    window.remote.dialog.showSaveDialog(options, handler);
  }
};

export function openLinkInBrowser(url) {
  if (isElectron()) {
    window.shell.openExternal(url);
  }
};

export function getAppName() {
  if (isElectron()) {
    return window.remote.app.getName();
  }
  return "";
}
