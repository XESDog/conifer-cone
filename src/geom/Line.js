/**
 * Created by work on 2017/2/16.
 */
import {Angle} from "./Angle";
import {Vector} from "./Vector";

import {throwArgumentsNumberInvalidError} from "../error/Error";

class Line {

    constructor(...rest) {
        this._k = 0;
        this._b = 0;
        this._x = 0;
        this._range = [];


        //垂直于x轴
        if (rest.length === 1) {
            this._x = rest[0];
            this._k = Infinity;
        }
        //k,b
        else if (rest.length === 2) {
            this._k = rest[0];
            this._b = rest[1];

        }
        //x1,y1,x2,y2
        else if (rest.length === 4) {
            let x1 = rest[0];
            let y1 = rest[1];
            let x2 = rest[2];
            let y2 = rest[3];
            this._k = (y2 - y1) / (x2 - x1);

            if (this.isVertical) {
                this._x = x1;
            } else {
                this._b = y1 - this._k * x1;
            }

        } else {
            throwArgumentsNumberInvalidError();
        }


        this._range = [-9999, 9999];
    }

    get k() {
        return this._k;
    }

    get b() {
        return this._b;
    }

    get x() {
        return this._x;
    }

    get range() {
        return this._range;
    }

    clone() {
        if (this.isVertical) {
            return new Line(this._x);
        }
        return new Line(this._k, this._b);
    }

    toString() {
        if (this.isVertical) {
            return `[Line (x=${this._x})]`;
        } else {
            return `[Line (k="${this._k}" b="${this._b}" )]`;
        }
    }

    /**
     * 获取用于绘图的点
     * @returns {Array}
     */
    get points() {
        let p;
        if (this.isVertical) {
            p = [new Vector(this._x, this._range[0])
                , new Vector(this._x, this._range[1])];
        }
        else if (this.isHorizontal) {
            p = [new Vector(this._range[0], this._b)
                , new Vector(this._range[1], this._b)];
        }
        else {
            p = [new Vector(this._range[0], this._k * this._range[0] + this._b)
                , new Vector(this._range[1], this._k * this._range[1] + this._b)];
        }
        return p;
    }

    /**
     * 垂直
     * @returns {boolean}
     */
    get isVertical() {
        return this._k === Infinity || this._k === -Infinity || this._b === Infinity || this._b === -Infinity;
    }

    /**
     * 水平
     * @returns {boolean}
     */
    get isHorizontal() {
        return this._k === 0;
    }

    /**
     * 点是否在直线上
     * 1个参数表示一个点
     * 2个参数表示一个坐标
     * @returns {boolean}
     * @param rest
     */
    testPoint(...rest) {

        let x = 0, y = 0;
        if (rest.length === 1) {
            if (rest[0] instanceof Vector) {
                ({x, y} = rest[0]);
            } else {
                throwArgumentsNumberInvalidError();
            }
        } else if (rest.length === 2) {
            ([x, y] = rest)
        } else {
            throwArgumentsNumberInvalidError();
        }


        if (this.isVertical) {
            return x === this._x;
        }
        return this._k * x + this._b === y;
    }

    /**
     * 获取和另外一条直线的交点
     * @param l
     */
    getIntersectionWithLine(l) {
        //平行
        if (this.k === l.k) {
            return null;
        }
        //两条线中有一条垂直
        else if (this.isVertical || l.isVertical) {
            return new Vector(this.isVertical ? this._x : l._x
                , this.isVertical ? l.k * this._x + l.b : this.k * l._x + this.b);
        }
        else {
            const k1 = this.k;
            const b1 = this.b;
            const k2 = l.k;
            const b2 = l.b;
            const x = (b2 - b1) / (k1 - k2);
            return new Vector(x, k1 * x + b1);
        }
    }

    /**
     * 获取经过指定点的垂线
     * @returns {Line}
     * @param rest
     */
    getVerticalLine(...rest) {

        let x = 0, y = 0;
        if (rest.length === 1) {
            if (rest[0] instanceof Vector) {
                ({x, y} = rest[0]);
            } else {
                throwArgumentsNumberInvalidError();
            }
        } else if (rest.length === 2) {
            ([x, y] = rest)
        } else {
            throwArgumentsNumberInvalidError();
        }


        if (this.isVertical) {
            return new Line(0, y);
        }
        if (this.isHorizontal) {
            return new Line(x);
        }
        return new Line(-1 / this._k, y + x / this._k);
    }

    /**
     * 获取经过指定点的垂线交点
     * @returns {*}
     * @param rest
     */
    getVerticalIntersection(...rest) {

        let x = 0, y = 0;
        if (rest.length === 1) {
            if (rest[0] instanceof Vector) {
                ({x, y} = rest[0]);
            } else {
                throwArgumentsNumberInvalidError();
            }
        } else if (rest.length === 2) {
            ([x, y] = rest)
        } else {
            throwArgumentsNumberInvalidError();
        }


        if (this.testPoint(x, y))return new Vector(x, y);
        let verticalLine = this.getVerticalLine(x, y);
        return this.getIntersectionWithLine(verticalLine);
    }

    /**
     * 获取对称点
     * @returns {Vector}
     * @param rest
     */
    getSymmetryPoint(...rest) {


        let x = 0, y = 0;
        if (rest.length === 1) {
            if (rest[0] instanceof Vector) {
                ({x, y} = rest[0]);
            } else {
                throwArgumentsNumberInvalidError();
            }
        } else if (rest.length === 2) {
            ([x, y] = rest)
        } else {
            throwArgumentsNumberInvalidError();
        }

        if (this.testPoint(x, y))return new Vector(x, y);

        //换算成一般式
        const A = this._k;
        const B = -1;
        const C = this._b;
        const temp = 2 * (A * x + B * y + C) / (A * A + B * B);

        return new Vector(x - A * temp, y - B * temp);

    }

    /**
     * 获取两条直线之间的距离，如果相交返回0
     * @param l
     * @returns {number}
     */
    getDistanceWithLine(l) {
        if (this.k === l.k) {
            if (this.k === Infinity) {
                return Math.abs(this.x - l.x);
            } else {
                return Math.cos(Math.atan(this.k)) * Math.abs(this.b - l.b);
            }
        }
        return 0;
    }

    /**
     * 获取两线夹角（0<=angle<=90）
     * @param l
     * @returns {number}
     */
    getIntersectionAngle(l) {
        let angle = new Angle();
        //平行
        if (this._k === l._k) {
            return 0;
        }
        //如果有一条直线垂直于x轴，计算出另外一条直线和x轴之间的夹角，然后用90度减去这个夹角
        if (this.isVertical || l.isVertical) {
            angle.angle = Math.atan(Math.abs(this.isVertical ? l._k : this._k))
            return 90 - angle.acute;
        }
        angle.angle = Math.atan(this._k) - Math.atan(l._k);
        return angle.acute;
    }

}

export {
    Line
}