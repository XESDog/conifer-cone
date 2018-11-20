import {Circle} from "../../src/geom/Circle";
import {Vector} from "../../src/geom/Vector";
import {Angle} from "../../src/geom/Angle";

describe('geom/Circle.js', () => {
    it('Circle construct', () => {
        const circle = new Circle(10, 10, 10);
        expect(circle.center.equals(new Vector(10, 10))).toBe(true);
        expect(circle.area).toBe(Angle.PI * 100);
        expect(circle.circumference).toBe(Angle.PI * 20);
        expect(circle.diameter).toBe(20);
    })
})