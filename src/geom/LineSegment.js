/**
 * Created by work on 2017/2/17.
 */

import {Line} from "./Line";
import {Vector} from "./Vector";
import {Rectangle} from "../geom/Rectangle";

import {throwArgumentsNumberInvalidError} from "../error/Error";

class LineSegment extends Line {
    set p2(value) {
        this._p2 = value;
    }

    set p1(value) {
        this._p1 = value;
    }

    constructor(...rest) {

        let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        //两个点
        if (rest.length === 2) {
            [{x: x1, y: y1}] = [rest[0]]
                [{x: x2, y: y2}] = [rest[1]]
        }
        //4个坐标定义两个点
        else if (rest.length === 4) {
            [x1, y1, x2, y2] = rest
        } else {
            throwArgumentsNumberInvalidError();
        }

        super(x1, y1, x2, y2);

        this._p1 = new Vector(x1, y1);
        this._p2 = new Vector(x2, y2);
        this._range = [Math.min(x1, x2), Math.max(x1, x2)];

    }

    get p1() {
        return this._p1;
    }

    get p2() {
        return this._p2;
    }

    get length() {
        return new Vector().subVectors(this._p1, this._p2)._length;
    }

    clone() {
        return new LineSegment(this._p1.x, this._p1.y, this._p2.x, this._p2, y);
    }

    /**
     * 中垂线
     */
    get perpendicularBisector() {

        let center = Vector.lerpVectors(this._p1, this._p2, 0.5);
        return this.toLine().getVerticalLine(center.x, center.y);
    }


    /**
     * 是否点在线段上
     * @param rest
     */
    testPoint(...rest) {

        let x, y;
        if (rest.length === 1) {
            ({x, y} = rest[0]);
        } else if (rest.length === 2) {
            ([x, y] = rest)
        } else {
            throwArgumentsNumberInvalidError();
        }

        return (super.testPoint(x, y) && this._isClamp(x, y));

    }

    /**
     * 是否在区域间，主要用于已经确定x,y在直线上之后的判断
     * @param x
     * @param y
     * @return {boolean}
     */
    _isClamp(x, y) {
        if (this.isVertical) {
            let [miny, maxy] = [Math.min(this._p1.y, this._p2.y), Math.max(this._p1.y, this._p2.y)]
            return y <= maxy && y >= miny;
        }
        else if (super.k === 0) {
            let [minx, maxx] = [Math.min(this._p1.x, this._p2.x), Math.max(this._p1.x, this._p2.x)]
            return x <= maxx && x >= minx;
        } else {
            return this.toRectangle().contains(x, y);
        }
    }

    /**
     * 是否和线段ls相交
     * @param ls
     */
    isIntersectWithLineSegment(ls) {
        let p = this.toLine().getIntersectionWithLine(ls.toLine());
        return !!(p && this._isClamp(p.x, p.y) && ls._isClamp(p.x, p.y));
    }

    /**
     * 和线段的交点
     * @return {Vector|null}
     */
    getIntersectionWithLineSegment(ls) {
        let p = this.toLine().getIntersectionWithLine(ls.toLine());
        if (p && this._isClamp(p.x, p.y) && ls._isClamp(p.x, p.y)) return p;
    }

    /**
     * 线段到线段的距离
     * @param l
     */
    getDistanceWithLineSegment(l) {
        if (this.isIntersectWithLineSegment(l)) {
            return 0;
        } else {
//todo
        }
    }

    toLine() {
        return new Line(this._p1.x, this._p1.y, this._p2.x, this._p2.y);
    }

    toVector() {
        return Vector.subVectors(this._p2, this._p1);
    }

    toRectangle() {
        let x = Math.min(this.p1.x, this.p2.x);
        let y = Math.min(this.p1.y, this.p2.y);
        let w = Math.abs(this.p1.x - this.p2.x);
        let h = Math.abs(this.p1.y - this.p2.y);
        return new Rectangle(x, y, w, h);
    }

    toString() {
        return `[LineSegment (p1.x="${this._p1.x}" p1.y="${this._p1.y}" p2.x="${this._p2.x}" p2.y="${this._p2.y}")]`;
    }
}

export {LineSegment};
