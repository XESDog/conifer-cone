/**
 * Created by work on 2017/2/21.
 */
import {LineSegment} from "./LineSegment";
import {throwArgumentsNumberInvalidError} from "../error/Error";
class Rectangle {
    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    constructor(x = 0, y = 0, w = 0, h = 0) {
        this._x = x;
        this._y = y;
        this._width = w;
        this._height = h;
        this.setValues(x, y, w, h);
    }

    get leftLineSegment() {
        return new LineSegment(this._x, this._y, this._x, this._y + this._height);
    }

    get rightLineSegment() {
        return new LineSegment(this._x + this._width, this._y, this._x + this._width, this._y + this._height);
    }

    get topLineSegment() {
        return new LineSegment(this._x, this._y, this._x + this._width, this._y);
    }

    get bottomLineSegment() {
        return new LineSegment(this._x, this._y + this._height, this._x + this._width, this._y + this._height);
    }

    get edges(){
        return [this.topLineSegment, this.rightLineSegment, this.bottomLineSegment, this.leftLineSegment];
    }

    /**
     * Sets the specified values on this instance.
     * @method setValues
     * @param {Number} [x=0] X position.
     * @param {Number} [y=0] Y position.
     * @param {Number} [width=0] The width of the Rectangle.
     * @param {Number} [height=0] The height of the Rectangle.
     * @return {Rectangle} This instance. Useful for chaining method calls.
     * @chainable
     */
    setValues(x, y, width, height) {
        // don't forget to update docs in the constructor if these change:
        this._x = x || 0;
        this._y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        return this;
    };

    /**
     * Extends the rectangle's bounds to include the described point or rectangle.
     * @method extend
     * @param {Number} x X position of the point or rectangle.
     * @param {Number} y Y position of the point or rectangle.
     * @param {Number} [width=0] The width of the rectangle.
     * @param {Number} [height=0] The height of the rectangle.
     * @return {Rectangle} This instance. Useful for chaining method calls.
     * @chainable
     */
    extend(x, y, width, height) {
        width = width || 0;
        height = height || 0;
        if (x + width > this._x + this.width) {
            this.width = x + width - this._x;
        }
        if (y + height > this._y + this.height) {
            this.height = y + height - this._y;
        }
        if (x < this._x) {
            this.width += this._x - x;
            this._x = x;
        }
        if (y < this._y) {
            this.height += this._y - y;
            this._y = y;
        }
        return this;
    };

    /**
     * Adds the specified padding to the rectangle's bounds.
     * @method pad
     * @param {Number} top
     * @param {Number} left
     * @param {Number} bottom
     * @param {Number} right
     * @return {Rectangle} This instance. Useful for chaining method calls.
     * @chainable
     */
    pad(top, left, bottom, right) {
        this._x -= left;
        this._y -= top;
        this.width += left + right;
        this.height += top + bottom;
        return this;
    };

    /**
     * Copies all properties from the specified rectangle to this rectangle.
     * @method copy
     * @param {Rectangle} rectangle The rectangle to copy properties from.
     * @return {Rectangle} This rectangle. Useful for chaining method calls.
     * @chainable
     */
    copy(rectangle) {
        return this.setValues(rectangle._x, rectangle._y, rectangle.width, rectangle.height);
    };

    testPoint(...rest) {
        let x, y;
        if (rest.length === 1) {
            ({x, y} = rest[0]);
        } else if (rest.length === 2) {
            ([x, y] = rest)
        } else {
            throwArgumentsNumberInvalidError();
        }

        return this.contains(x, y, 1, 1);
    }

    rayCast() {

    }

    /**
     * Returns true if this rectangle fully encloses the described point or rectangle.
     * @method contains
     * @param {Number} x X position of the point or rectangle.
     * @param {Number} y Y position of the point or rectangle.
     * @param {Number} [width=0] The width of the rectangle.
     * @param {Number} [height=0] The height of the rectangle.
     * @return {Boolean} True if the described point or rectangle is contained within this rectangle.
     */
    contains(x, y, width, height) {
        width = width || 0;
        height = height || 0;
        return (x >= this._x && x + width <= this._x + this.width && y >= this._y && y + height <= this._y + this.height);
    };

    /**
     * Returns a new rectangle which contains this rectangle and the specified rectangle.
     * @method union
     * @param {Rectangle} rect The rectangle to calculate a union with.
     * @return {Rectangle} A new rectangle describing the union.
     */
    union(rect) {
        return this.clone().extend(rect._x, rect._y, rect.width, rect.height);
    };

    /**
     * Returns a new rectangle which describes the intersection (overlap) of this rectangle and the specified rectangle,
     * or null if they do not intersect.
     * @method intersection
     * @param {Rectangle} rect The rectangle to calculate an intersection with.
     * @return {Rectangle} A new rectangle describing the intersection or null.
     */
    intersection(rect) {
        var x1 = rect._x, y1 = rect._y, x2 = x1 + rect.width, y2 = y1 + rect.height;
        if (this._x > x1) {
            x1 = this._x;
        }
        if (this._y > y1) {
            y1 = this._y;
        }
        if (this._x + this.width < x2) {
            x2 = this._x + this.width;
        }
        if (this._y + this.height < y2) {
            y2 = this._y + this.height;
        }
        return (x2 <= x1 || y2 <= y1) ? null : new Rectangle(x1, y1, x2 - x1, y2 - y1);
    };

    /**
     * Returns true if the specified rectangle intersects (has any overlap) with this rectangle.
     * @method intersects
     * @param {Rectangle} rect The rectangle to compare.
     * @return {Boolean} True if the rectangles intersect.
     */
    intersects(rect) {
        return (rect._x <= this._x + this.width && this._x <= rect._x + rect.width && rect._y <= this._y + this.height && this._y <= rect._y + rect.height);
    };

    /**
     * Returns true if the width or height are equal or less than 0.
     * @method isEmpty
     * @return {Boolean} True if the rectangle is empty.
     */
    isEmpty() {
        return this.width <= 0 || this.height <= 0;
    };

    /**
     * Returns a clone of the Rectangle instance.
     * @method clone
     * @return {Rectangle} a clone of the Rectangle instance.
     **/
    clone() {
        return new Rectangle(this._x, this._y, this.width, this.height);
    };

    /**
     * Returns a string representation of this object.
     * @method toString
     * @return {String} a string representation of the instance.
     **/
    toString() {
        return "[Rectangle (x=" + this._x + " y=" + this._y + " width=" + this.width + " height=" + this.height + ")]";
    };

}
export {Rectangle};