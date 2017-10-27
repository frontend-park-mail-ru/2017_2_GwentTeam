import f from './test123';

describe('test', () => {

    it('f1', () => {
        const res = f(4,5);
        expect(res).toBe(20);
    });

    it('f2', () => {
        const res = f(5,5);
        expect(res).toBe(25);
    });
});
