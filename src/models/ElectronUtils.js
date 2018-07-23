let electron = null
if (typeof window.require === 'function') {
  electron = window.require('electron')
} else {
  electron = require('electron')
}

export default electron
