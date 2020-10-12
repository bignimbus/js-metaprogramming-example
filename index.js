class ClassWithMethodMissing {
  constructor () {
    return new Proxy(this, this.__methodMissing__());
  }

  methodMissing__get () {
    throw new Error('Must implement getter');
  }

  methodMissing__set () {
    throw new Error('Must implement setter');
  }

  __methodMissing__ () {
    return {
      get: (_, key) => this.methodMissing__get(key),
      set: (_, key, val) => this.methodMissing__set(key, val),
    };
  }
}

module.exports = { ClassWithMethodMissing };
