import {Angle} from "../../src/geom/Angle";

describe('geom/Angle.js', () => {
    it('Angle construct', () => {
        const angle = new Angle();
        expect(angle.radian).toBe(0);
        expect(angle.angle).toBe(0);

        const angle2 = new Angle(Angle.PI);
        expect(angle2.radian).toBe(Angle.PI);
        expect(angle2.angle).toBe(180);

        const angle3 = new Angle(180, false);
        expect(angle3.radian).toBe(Angle.PI)
        expect(angle3.angle).toBe(180);

    })
    it('Angle is acute', () => {
        const angle = new Angle(89, false);
        expect(angle.isAcute).toBe(true);

        const angle2 = new Angle(271, false);
        expect(angle2.isAcute).toBe(true);

    })
    it('Angle is obtuse', () => {
        const angle = new Angle(91, false);
        expect(angle.isObtuse).toBe(true);

        const angle2 = new Angle(181, false);
        expect(angle2.isObtuse).toBe(true);

        const angle3 = new Angle(269, false);
        expect(angle3.isObtuse).toBe(true);
    })
    it('Angle is right', () => {
        const angle = new Angle(90, false);
        expect(angle.isRight).toBe(true);

        const angle2 = new Angle(270, false);
        expect(angle2.isRight).toBe(true);
    })
})