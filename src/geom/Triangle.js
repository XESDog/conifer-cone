import {Vector} from "./Vector";
import {Angle} from "./Angle";
import {LineSegment} from "./LineSegment";

import {throwArgumentsNumberInvalidError, throwMissingParameterError} from "../error/Error";


class Triangle {
    get c() {
        return this._c;
    }

    get b() {
        return this._b;
    }

    get a() {
        return this._a;
    }

    get ACB() {
        return this._ACB;
    }

    get CBA() {
        return this._CBA;
    }

    get BAC() {
        return this._BAC;
    }

    constructor(a = throwMissingParameterError(),
                b = throwMissingParameterError(),
                c = throwMissingParameterError(),
                d, e, f) {

        let x1, y1, x2, y2, x3, y3;

        if (arguments.length === 3) {
            ([{x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}] = arguments)
        }
        else if (arguments.length === 6) {
            ([x1, y1, x2, y2, x3, y3] = arguments)
        } else {
            throwArgumentsNumberInvalidError();
        }

        //点
        this._p1 = new Vector(x1, y1);
        this._p2 = new Vector(x2, y2);
        this._C = new Vector(x3, y3);

        //边
        this._a = new LineSegment(this._p2, this._C);
        this._b = new LineSegment(this._p1, this._C);
        this._c = new LineSegment(this._p1, this._p2);

        //角
        this._BAC = new Angle(Vector.subVectors(this._p2, this._p1).angleTo(Vector.subVectors(this._C, this._p1)));
        this._CBA = new Angle(Vector.subVectors(this._C, this._p2).angleTo(Vector.subVectors(this._p1, this._p2)));
        this._ACB = new Angle(Vector.subVectors(this._p1, this._C).angleTo(Vector.subVectors(this._p2, this._C)));

    }

    get C() {
        return this._C;
    }

    get B() {
        return this._p2;
    }

    get A() {
        return this._p1;
    }

    testPoint(...rest) {
        let x, y;
        if (rest.length === 1) {
            ({x, y} = rest[0]);
        } else if (rest.length === 2) {
            ([x, y] = rest)
        } else {
            throwArgumentsNumberInvalidError();
        }


    }

    rayCast() {

    }

    /**
     * 垂心
     */
    get orthocenter() {
        //垂线交点
        return this._a.getVerticalLine(this._p1.x, this._p1.y)
            .getIntersectionWithLine
            (this._b.getVerticalLine(this._p2.x, this._p2.y));
    }

    /**
     * 重心
     */
    get barycenter() {
        //中垂线交点
        return this._a.perpendicularBisector
            .getIntersectionWithLine
            (this._b.perpendicularBisector);

    }

    /**
     * 外心
     */
    get circumcenter() {

    }

    /**
     * 内心
     */
    get innercenter() {

    }

    /**
     * 面积，矢量ABXAC再除以2
     * @returns {number}
     */
    get area() {
        let AB = Vector.subVectors(this._p2, this._p1);
        let AC = Vector.subVectors(this._C, this._p1);
        return Math.abs(AB.cross(AC)) * 0.5;
    }

    clone() {
        return new Triangle(this._p1.x, this._p1.y, this._p2.x, this._p2.y, this._C.x, this._C.y);
    }

    toString() {
        return `[Triangle (A.x="${this._p1.x}" A.y="${this._p2.y}" B.x="${this._p2.x}" B.y="${this._p2.y}" C.x="${this._C.x}" C.y="${this._C.y}")]`;
    }
}

export {Triangle}