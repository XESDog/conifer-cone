class Angle {
    static RADIAN_TO_ANGLE =  180/Math.PI;
    static ANGLE_TO_DEGREE = Math.PI/180;
    static PI = Math.PI;
    static PI2 = Math.PI * 2;
    static PI_HALF = Math.PI / 2;

    /**
     * 限定角度范围在 0~360，弧度范围限定在0~2π
     * @param radian
     * @param isRadian
     * @returns {number}
     */
    static normal(radian = 0, isRadian = true) {
        //弧度
        if (isRadian) {
            return (radian %= 360) < 0 ? radian + 360 : radian;
        }
        //角度
        else {
            return (radian %= Angle.PI2) < 0 ? radian + Angle.PI2 : radian;
        }
    }

    /**
     * 初始化Angle，可以传入弧度或者角度
     * @param radian
     * @param isRadian  默认为true，表示第一个参数是弧度，设置为false，则表示第一个参数是角度
     *
     */
    constructor(radian = 0, isRadian = true) {
        this._radian = 0;
        this._angle = 0;


        if (isRadian) {
            this.radian = radian;
        } else {
            this.angle = radian;
        }
    }

    clone() {
        return new Angle(this._radian);
    }

    set radian(value) {
        this._radian = Angle.normal(value);
        this._angle = this._radian * Angle.RADIAN_TO_ANGLE;
    }

    get radian() {
        return this._radian;
    }

    set angle(value) {
        this._radian = Angle.normal(value * Angle.ANGLE_TO_DEGREE);
        this._angle = this._radian * Angle.RADIAN_TO_ANGLE;
    }

    get angle() {
        return this._angle;
    }

    /**
     * 是否锐角
     * @returns {boolean}
     */
    get isAcute() {
        return this._angle < 90 || this._angle > 270;
    }

    /**
     * 是否直角
     * @returns {boolean}
     */
    get isRight() {
        return (this._angle % 90) === 0;
    }

    /**
     * 是否钝角
     * @returns {boolean}
     */
    get isObtuse() {
        return this._angle > 90 && this._angle < 270;
    }

    /**
     * 求锐角
     * @returns {number}
     */
    get acute() {
        let a = this._angle;
        return (a %= 90) < 0 ? -a : a;
    }

    /**
     * 求钝角
     * @returns {number}
     */
    get obtuse() {
        return 180 - this.acute;
    }

    toString() {
        return `[Angle (radian="${this._radian}" angle="${this._angle}")]`;
    }

}


export {Angle}