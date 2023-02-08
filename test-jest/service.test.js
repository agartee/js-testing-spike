const chai = require('chai')
  , spies = require('chai-spies');

const should = chai.should(); // VS Code reports this as unused...

const Service = require('../service');
const serviceDependency = require('../service-dependency')

describe('service: jest', () => {
  
  describe('sum', () => {

    it('returns 3 when provided 1 and 2', () => {
      const service = new Service();
      const result = service.sum(1, 2);
      result.should.equal(3);
    });
    
    describe('with Chai spy', () => {
      chai.use(spies);
      
      afterEach(function() {
        chai.spy.restore(serviceDependency);
      });

      it('returns 10 when provided 1 and 2 and a spy-bonus of 7 (normally 0)', () => {
        const mySpy = chai.spy.on(serviceDependency, 'getBonus', function() {
          return 7; // normally 0
        });
      
        const service = new Service();
        const result = service.sum(1, 2);
        result.should.equal(10); // with mocked serviceDependency bonus

        mySpy.should.have.been.called(1);
      });
    });

    describe('with Jest spy', () => {
      
      afterEach(function() {
        jest.restoreAllMocks();
      });

      it('returns 45 when provided 1 and 2 and a spy-bonus of 42 (normally 0)', () => {
        chai.use(spies);
        jest.spyOn(serviceDependency, 'getBonus')
          .mockReturnValue(42); // normally 0
      
        const service = new Service();
        const result = service.sum(1, 2);
        
        expect(result).toBe(45); // with mocked serviceDependency bonus
        expect(serviceDependency.getBonus).toHaveBeenCalledTimes(1);
      });
    });
  });
});
