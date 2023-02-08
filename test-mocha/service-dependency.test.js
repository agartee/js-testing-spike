const chai = require('chai')
  , spies = require('chai-spies');

const serviceDependency = require('../service-dependency')

// VS Code: 'should' is declared but its value is never read. - FALSE!
const should = chai.should() 
  , expect = chai.expect;

chai.use(spies);

describe('service-dependency: mocha', () => {

  describe('getBonus', () => {

    it('returns zero', async () => {
      const result = await serviceDependency.getBonus();
    
      // different assertion formats:
      result.should.equal(0);
      expect(result).to.equal(0);
    });

    describe('with Chai spy', () => {
      beforeEach(function() {
        chai.spy.on(serviceDependency, 'getBonus', function() {
          return 2; // normally 0
        });
      });

      it('demo spying', async () => {
        let result = await serviceDependency.getBonus();
        result.should.equal(2);
      });

      afterEach(function() {
        chai.spy.restore(serviceDependency);
      });
    });
  });
});
