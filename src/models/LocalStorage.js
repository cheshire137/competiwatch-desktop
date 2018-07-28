class LocalStorage {
  static set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  static get(key) {
    const json = window.localStorage.getItem(key)
    return JSON.parse(json)
  }

  static delete(key) {
    window.localStorage.removeItem(key)
  }
}

export default LocalStorage
