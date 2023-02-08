const { default: axios } = require("axios");

const serviceDependency = {
  getBonus: async () => axios.get("http://www.test.com")
}

module.exports = serviceDependency;
