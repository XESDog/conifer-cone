/**
 * 参考THREE.Vector2
 */

class Vector {
    _x = 0;
    _y = 0;
    _length = 0;

    set y(value) {
        this._y = value;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    get x() {
        return this._x;
    }

    constructor(x, y) {
        this._x = x || 0;
        this._y = y || 0;
    }

    setValues(x, y) {
        this._x = x;
        this._y = y;

        return this;
    }

    setScalar(scalar) {
        this._x = scalar;
        this._y = scalar;

        return this;
    }

    clone() {
        return new Vector(this._x, this._y);
    }

    copy(v) {
        this._x = v._x;
        this._y = v._y;

        return this;
    }


    addScalar(s) {
        this._x += s;
        this._y += s;

        return this;
    }

    /**
     *
     * @returns {Vector}
     * @param {Vector} v
     */
    add(v) {
        this._x += v.x;
        this._y += v.y;

        return this;

    }

    /**
     *
     * @param {Vector} a
     * @param {Vector} b
     * @return {Vector}
     */
    static addVectors(a, b) {
        return a.add(b)
    }

    /**
     *
     * @param {Vector} v
     * @param {Vector} s
     * @return {Vector}
     */
    addScaledVector(v, s) {
        this._x += v._x * s;
        this._y += v._y * s;

        return this;

    }

    /**
     *
     * @param {Vector} v
     * @return {Vector}
     */
    sub(v) {

        this._x -= v._x;
        this._y -= v._y;

        return this;
    }

    subScalar(s) {
        this._x -= s;
        this._y -= s;

        return this;
    }

    /**
     *
     * @param {Vector} a
     * @param {Vector} b
     * @return {Vector}
     */
    static subVectors(a, b) {
        return a.sub(b)
    }

    multiply(v) {
        this._x *= v._x;
        this._y *= v._y;

        return this;
    }

    multiplyScalar(scalar) {
        if (isFinite(scalar)) {

            this._x *= scalar;
            this._y *= scalar;

        } else {

            this._x = 0;
            this._y = 0;

        }

        return this;
    }

    /**
     * 做除法，点乘的变种
     * @param v
     * @returns {Vector}
     */
    divide(v) {
        this._x /= v._x;
        this._y /= v._y;

        return this;
    }

    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }

    min(v) {
        this._x = Math.min(this._x, v._x);
        this._y = Math.min(this._y, v._y);

        return this;
    }

    max(v) {
        this._x = Math.max(this._x, v._x);
        this._y = Math.max(this._y, v._y);

        return this;
    }

    clamp(min, max) {
        // This function assumes min < max, if this assumption isn't true it will not operate correctly
        this._x = Math.max(min._x, Math.min(max._x, this._x));
        this._y = Math.max(min._y, Math.min(max._y, this._y));

        return this;
    }

    clampLength(min, max) {
        let length = this._length();

        return this.multiplyScalar(Math.max(min, Math.min(max, length)) / length);
    }

    floor() {
        this._x = Math.floor(this._x);
        this._y = Math.floor(this._y);

        return this;
    }

    ceil() {
        this._x = Math.ceil(this._x);
        this._y = Math.ceil(this._y);

        return this;
    }

    round() {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);

        return this;
    }

    roundToZero() {
        this._x = (this._x < 0) ? Math.ceil(this._x) : Math.floor(this._x);
        this._y = (this._y < 0) ? Math.ceil(this._y) : Math.floor(this._y);

        return this;
    }

    negate() {
        this._x = -this._x;
        this._y = -this._y;

        return this;
    }

    /**
     * 点乘
     * @param v
     * @returns {number}
     */
    dot(v) {
        return this._x * v._x + this._y * v._y;
    }

    /**
     * 叉乘方向，在为二维矢量中用来描述方向
     * 大于0，小于0，等于0（共线）
     * @param v
     * @returns {number}
     */
    cross(v) {
        return this._x * v._y - this._y * v._x;
    }

    lengthSq() {
        return this._x * this._x + this._y * this._y;
    }

    get length() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    set length(length) {
        return this.multiplyScalar(length / this._length);
    }

    /*lengthManhattan() {
        return Math.abs(this._x) + Math.abs(this._y);
    }*/

    normalize() {
        return this.divideScalar(this._length);
    }

    /**
     * 和另一个向量的夹角弧度值
     * @param v
     * @returns {number}
     */
    angleTo(v) {
        let cos = this.dot(v) / (this.length * v.length);
        //纠正偏差，cos的取值范围为[-1,1]
        if (cos < -1) cos = -1;
        if (cos > 1) cos = 1;

        return Math.acos(cos);//0~π
    }

    get angle() {
        // computes the angle in radians with respect to the positive x-axis

        var angle = Math.atan2(this._y, this._x);//-π~π

        if (angle < 0) angle += 2 * Math.PI;//0~2π

        return angle;
    }

    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v) {
        var dx = this._x - v._x, dy = this._y - v._y;
        return dx * dx + dy * dy;
    }

    distanceToManhattan(v) {
        return Math.abs(this._x - v._x) + Math.abs(this._y - v._y);
    }


    /**
     * 定比分点
     *
     * @param v
     * @param alpha
     * @returns {Vector}
     */
    lerp(v, alpha) {
        this._x += (v._x - this._x) * alpha;
        this._y += (v._y - this._y) * alpha;

        return this;
    }

    equals(v) {
        return ((v._x === this._x) && (v._y === this._y));
    }

    /**
     * 旋转
     * @param center
     * @param {Angle} angle
     * @returns {Vector}
     */
    rotateAround(center, angle) {
        let c = Math.cos(angle.radian), s = Math.sin(angle.radian);

        let x = this._x - center._x;
        let y = this._y - center._y;

        this._x = x * c - y * s + center._x;
        this._y = x * s + y * c + center._y;

        return this;
    }

    toString() {
        return "[Vector2 (x=" + this._x + " y=" + this._y + ")]";
    }


}

let zero = new Vector();
Vector.ZERO = new Proxy(zero, {
    set: function (target, property) {

    },
    setPrototypeOf: function () {

    },
    apply: function () {

    },
    constructor: function () {

    },
    deleteProperty: function () {

    },

});

export {Vector};
