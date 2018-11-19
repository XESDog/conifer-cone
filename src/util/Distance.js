/**
 * Created by work on 2017/2/23.
 */
class Distance {
    constructor() {
        throw new Error('Instantiation is not allowed!')
    }

    /**
     * 两点之间的距离
     * @param p1
     * @param p2
     * @returns {number}
     */
    static pointToPoint(p1, p2) {
        let w = p1.x - p2.x;
        let h = p1.y - p2.y;
        return Math.sqrt(w * w + h * h);
    };

    /**
     * 点到直线的距离
     * @param p
     * @param l
     */
    static pointToLine(p, l) {
        let intersection = l.getVerticalIntersection(p.x, p.y);

        return {
            intersection: intersection,
            distance: Distance.pointToPoint(p, intersection),
        }
    }

    /**
     * 两条线段之间的距离
     * @param ls1
     * @param ls2
     * @returns {number}
     * @constructor
     */
    static lineSegmentToLineSegment(ls1, ls2) {
        return 0;
    };

    /**
     * 点到线段的距离
     * @param p
     * @param ls
     * @returns {{intersection, distance: number}}
     */
    static pointToLineSegment(p, ls) {
        //点是否在线段上
        if (ls.testPoint) {
            return {intersection: p.clone(), distance: 0};
        } else {
            //根据r值来判断P点在AB上的投影是否在线段上
            let AB = ls.toVector();
            let AP = p.toVector().sub(ls._p1);
            let len = ls._length;
            let r = AP.dot(AB) / (len * len);
            if (r >= 1) {
                return {
                    intersection: ls.B.clone(),
                    distance: Distance.pointToPoint(p, ls.B)
                };
            } else if (r <= 0) {
                return {
                    intersection: ls.p1.clone(),
                    distance: Distance.pointToPoint(p, ls.p1)
                };
            } else {
                let intersection = ls.p1.toVector().lerp(ls.B.toVector(), r);
                return {
                    intersection: intersection,
                    distance: Distance.pointToPoint(p, intersection),
                };
            }
        }
    };

    /**
     * 点到圆的距离
     * @param p
     * @param c
     * @returns {number}
     */
    static pointToCircle(p, c) {
        return 0;
    }
}

export {Distance};
