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
    console.log(`Returning all rows from table ${this.tableName()}`);
    const fakeData = [{ id: 1, name: "Jeff" }, { id: 2, name: "Geoffrois" }];
    for (let row of fakeData) {
      yield row;
    }
  };

  methodMissing__get (key) {
    if (this.hasOwnProperty(key) || this.constructor.prototype[key]) {
      return this[key];
    } else {
      console.log(`SELECT id, ${key} FROM ${this.constructor.tableName()} WHERE id = 999`);
    }
  }

  methodMissing__set (key, value) {
    if (this.hasOwnProperty(key) || this.constructor.prototype[key]) {
      this[key] = value;
      return this[key];
    } else {
      console.log(`UPDATE ${this.constructor.tableName()} SET ${key} = ${value} WHERE id = 999`);
    }
  }
}

class User extends ActiveRecordBase {
  isStudent () {
    return this.userType === 'Students';
  }
}

module.exports = { ClassWithMethodMissing, ActiveRecordBase, User };
