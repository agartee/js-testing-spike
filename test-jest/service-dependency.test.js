const chai = require('chai')
  , spies = require('chai-spies');

const serviceDependency = require('../service-dependency')

// VS Code: 'should' is declared but its value is never read. - FALSE!
const should = chai.should() 
  , expect = chai.expect;

describe('service-dependency: jest', () => {

  describe('getBonus', () => {

    it('returns zero', () => {
      const result = serviceDependency.getBonus();
    
      // different assertion formats:
      result.should.equal(0);
      expect(result).to.equal(0);
    });
    
    describe('with Chai spy', () => {
      
      afterEach(function() {
        chai.spy.restore(serviceDependency);
      });

      it('can be spied on', () => {
        chai.use(spies);
        chai.spy.on(serviceDependency, 'getBonus', function() {
          return 2;
        });
      
        let result = serviceDependency.getBonus();
        result.should.equal(2);
      });
    });

    describe('with Jest spy', () => {
      
      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('can be spied on', () => {
        jest.spyOn(serviceDependency, 'getBonus')
          .mockReturnValue(2);
        
        let result = serviceDependency.getBonus();
        
        // using Chai assertion due to import conflict for demo for 'expect'
        // ... will not normally use two assertion libraries in real project
        expect(result).to.equal(2);
      });
    });
  });
});
