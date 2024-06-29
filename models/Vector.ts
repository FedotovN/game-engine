import { negativeRandom } from "../utils/random";

export default class Vector {
    constructor(public x: number = 0, public y: number = 0) {}
    static zero(): Vector {
        return new Vector(0 ,0);
    }
    static dot(v1: Vector, v2: Vector) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static random() {
        return new Vector(negativeRandom(-1, 1), negativeRandom(-1, 1));
    }

    static distance(v1: Vector, v2: Vector) {
        return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
    }

    scale(scalar: number) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    negative() {
        return new Vector(-this.x, -this.y);
    }
    normalize() {
        if (this.getLength() === 0) return Vector.zero();
        return new Vector(this.x / this.getLength(), this.y / this.getLength());
    }
    getLength() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}
