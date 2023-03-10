const chai = require('chai')
  , spies = require('chai-spies');

const should = chai.should();

const Service = require('../service');
const serviceDependency = require('../service-dependency')

describe('service: mocha', () => {
  
  describe('sum', () => {
    it('returns 3 when provided 1 and 2', async () => {
      const service = new Service();
      const result = await service.sum(1, 2);
      result.should.equal(3);
    });
    
    describe('with spy', () => {
      chai.use(spies);

      beforeEach(function() {
        chai.spy.on(serviceDependency, 'getBonus', function() {
          return 7; // normally 0
        });
      });

      it('returns 10 when provided 1 and 2 and a spy-bonus of 7 (normally 0)', async () => {
        const service = new Service(); // <- going to import 'serviceDependency'...
        const result = await service.sum(1, 2);
        result.should.equal(10); // with mocked serviceDependency bonus!
      });

      afterEach(function() {
        chai.spy.restore(serviceDependency);
      });
    });
  });
});
