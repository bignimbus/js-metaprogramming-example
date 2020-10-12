class Model {
}

const handler = {
  set (modelInstance, key, val) {
    if (modelInstance.hasOwnProperty(key)) {
      modelInstance[key] = val;
      return modelInstance[key];
    }
    return modelInstance.__obj__[key];
  },
};

const modelFactory = (obj) => {
};

module.exports = Model;
