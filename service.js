const dependencyService = require('./service-dependency')

class Service {
  async sum(a, b) {
    const bonus = await dependencyService.getBonus();
    return a + b + bonus;
  }
}

module.exports = Service;
