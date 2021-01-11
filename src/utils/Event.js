class Event {
  constructor() {
    this._cache = {}
  }

  addEventListener(type, callback) {
    let fns = (this._cache[type] = this._cache[type] || [])
    if (callback && fns.indexOf(callback) === -1) {
      fns.push(callback)
    }
  }

  emit(type, args) {
    if (this._cache[type]) {
      this._cache[type].forEach(fn => fn.apply(this, args))
    }
  }

  removeEventListener(type, callback) {
    if (this._cache[type]) {
      if (callback) {
        const i = this._cache[type].indexOf(callback)
        if (i !== -1) this._cache[type].splice(i, 1)
      } else {
        this._cache[type] = []
      }
    }
  }
}