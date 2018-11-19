/**
 * Created by work on 2017/2/16.
 */


import {Vector} from "./Vector";
import {Distance} from "../util/Distance";

class Circle {
    set radius(value) {
        this._radius = value;
    }

    set y(value) {
        this._y = value;
    }

    set x(value) {
        this._x = value;
    }

    constructor(x, y, radius) {
        this._x = x;
        this._y = y;
        this._radius = radius;
    }

    setValues(x, y, radius) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        return this;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get radius() {
        return this._radius;
    }

    get center() {
        return new Vector(this._x, this._y);
    }

    /**
     *
     * @return {Vector}
     * @param {Angle} angle
     */
    getPoint(angle) {
        let x = Math.cos(angle.radian) * this._radius + this._x;
        let y = Math.sin(angle.radian) * this._radius + this._y;
        return new Vector(x, y);
    }

    contains(x, y) {
        let p = new Vector(x, y);
        let d = p.sub(this.center).length;
        return d <= this._radius;
    }

    /**
     * 是否和圆c相交
     * @param c
     * @returns {boolean}
     */
    isIntersectWithCircle(c) {

        let distance = Distance.pointToPoint(this.center, c.center);
        return this.radius + c.radius >= distance
            //避免覆盖
            && Math.abs(this.radius - c.radius) <= distance;

    }

    /**
     * 获取和圆的交点
     * @param c
     * @returns {Array}
     */
    getIntersectionWithCircle(c) {
        if (!this.isIntersectWithCircle(c)) return null;

        //以this._x,this._y为中心旋转c
        let angle = Math.atan2(c.y - this._y, c.x - this._x);
        let cNewCenter = c.center.clone();
        cNewCenter.setValues(c.x - this._x, c.y - this._y);
        cNewCenter.rotateAround(Vector.ZERO, -angle);

        let [r1, r2, d] = [this.radius, c.radius, Math.abs(cNewCenter.x)];
        let x = (d * d + r1 * r1 - r2 * r2) / (2 * d);
        let y1 = Math.sqrt(r1 * r1 - x * x);
        let y2 = -y1;

        let ps;
        if (y1 === y2) {
            ps = [new Vector(x, y1)];

        } else {
            ps = [new Vector(x, y1), new Vector(x, y2)];
        }

        if (ps.length > 0) {
            ps.map((value) => {
                value.rotateAround(Vector.ZERO, angle);
                return value.setValues(value.x + this._x, value.y + this._y);
            });
        }

        return ps;
    }

    /**
     * 检查p点是否在圆内
     * @param p
     * @returns {boolean}
     */
    testPoint(p) {

        return this.center.sub(p).length <= this._radius;
    }

    rayCast() {

    }

    /**
     * 面积
     * @returns {number}
     */
    get area() {
        return Math.PI * this._radius * this._radius;
    }

    /**
     * 周长
     * @returns {number}
     */
    get circumference() {
        return 2 * Math.PI * this._radius;
    }

    /**
     * 直径
     * @returns {number}
     */
    get diameter() {
        return 2 * this._radius;
    }

    clone() {
        return new Circle(this._x, this._y, this._radius);
    }

    toString() {
        return "[Circle (radius=" + this._radius + " circumference=" + this.circumference + " area=" + this.area + ")]";
    }

}

export {Circle};