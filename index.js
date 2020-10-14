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
      get: (self, key) => this.methodMissing__get.call(self, key),
      set: (self, key, val) => this.methodMissing__set.call(self, key, val),
    };
  }
}

class ActiveRecordBase extends ClassWithMethodMissing {
  static tableName () {
    return this.name;
  }

  static [Symbol.iterator] = function * () {
    // const allRows = `SELECT id, ${key} FROM ${this.constructor.tableName()} WHERE id = ${this.id}`;
    for (let n of allRows) {
      yield n;
    }
  }

  methodMissing__get (key) {
    if (this.hasOwnProperty(key)) {
      return this[key];
    } else {
      console.log(`SELECT id, ${key} FROM ${this.constructor.tableName()} WHERE id = ${this.id}`);
    }
  }

  methodMissing__set (key, value) {
  }
}

class User extends ActiveRecordBase {}

module.exports = { ClassWithMethodMissing, ActiveRecordBase, User };
