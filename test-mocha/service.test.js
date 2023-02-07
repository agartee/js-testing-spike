const chai = require('chai')
  , spies = require('chai-spies');

const should = chai.should();

const Service = require('../service');
const serviceDependency = require('../service-dependency')

describe('service: mocha', () => {
  
  describe('sum', () => {
    it('returns 3 when provided 1 and 2', () => {
      const service = new Service();
      const result = service.sum(1, 2);
      result.should.equal(3);
    });
    
    // structure differs for Mocha to prevent error:
    // Error: "getBonus" is already a spy
    describe('with spy', () => {
      chai.use(spies);

      // hoops!
      beforeEach(function() {
        chai.spy.on(serviceDependency, 'getBonus', function() {
          return 7; // normally 0
        });
      });

      it('returns 10 when provided 1 and 2 and a spy-bonus of 7 (normally 0)', () => {
        const service = new Service(); // <- going to import 'serviceDependency'...
        const result = service.sum(1, 2);
        result.should.equal(10); // with mocked serviceDependency bonus!
      });

      // more hoops!
      afterEach(function() {
        chai.spy.restore(serviceDependency);
      });
    });
  });
});
