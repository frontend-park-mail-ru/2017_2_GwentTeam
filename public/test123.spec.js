import f from './test123';

describe('test', function() {

    it('f1', function() {
        const res = f(4,5);
        expect(res).toBe(20);
    })

    it('f2', function() {
            const res = f(5,5);
            expect(res).toBe(25);
    })

})
