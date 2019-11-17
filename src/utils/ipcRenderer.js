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
