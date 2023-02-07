const dependencyService = require('./service-dependency')

class Service {
  sum(a, b) {
    return a + b + dependencyService.getBonus();
  }
}

module.exports = Service;
