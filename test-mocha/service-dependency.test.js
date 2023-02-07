const chai = require('chai')
  , spies = require('chai-spies');

const serviceDependency = require('../service-dependency')

// VS Code: 'should' is declared but its value is never read. - FALSE!
const should = chai.should() 
  , expect = chai.expect;

chai.use(spies);

describe('service-dependency: mocha', () => {

  describe('getBonus', () => {

    it('returns zero', () => {
      const result = serviceDependency.getBonus();
    
      // different assertion formats:
      result.should.equal(0);
      expect(result).to.equal(0);
    });

    // structure differs for Mocha to prevent error:
    // Error: "getBonus" is already a spy 
    describe('with spy', () => {
      // hoops!
      beforeEach(function() {
        chai.spy.on(serviceDependency, 'getBonus', function() {
          return 2; // normally 0
        });
      });

      it('demo spying', () => {
        let result = serviceDependency.getBonus();
        result.should.equal(2);
      });

      // more hoops!
      afterEach(function() {
        chai.spy.restore(serviceDependency);
      });
    });
  });
});
