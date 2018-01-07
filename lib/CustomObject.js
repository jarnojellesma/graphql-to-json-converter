module.exports = function CustomObject(obj) {
  return {
    _head: obj,
    _parents: [],
    current: obj,
    addcurr(name) {
      if (typeof this.current[name] === 'undefined') this.current[name] = {};
      this.in(name);
    },
    head() {
      this._parents = [];
      return this.current = this._head;
    },
    in(name) {
      this._parents.push(this.current);
      return this.current = this.current[name]
    },
    out() {
      if (this._parents.length > 0)
        return this.current = this._parents.pop();
      else
        return this.current;
    },
  };
}
