import Vector from "../Vector";
import degreesToRad from "../../utils/degreesToRad";

export type ShapeOptions = {
    points: Vector[],
    scale?: number,
}

export default class PolygonShape {
    points: Vector[];
    private _scale: number = 1;
    get scale() {
        return this._scale;
    }
    set scale(value: number) {
        if (value < 0) {
            this._scale = 0
            return;
        }
        this._scale = value;
    }
    constructor({ points, scale }: ShapeOptions) {
        this.points = points;
        this._scale = scale || this._scale;
    }
    private _getScaledPoint(point: Vector) {
        return new Vector(point.x * this._scale, point.y * this._scale);
    }
    getPointsPosition(origin: Vector, rotation: number): Vector[] {
        return this.points.map(p => {
           const { x, y } = this._getScaledPoint(p);
           const { x: ox, y: oy } = origin;
           return PolygonShape.rotatePoint(x + ox, y + oy, rotation, origin);
        });
    }
    static rotatePoint(x: number, y: number, rotation: number, origin: Vector): Vector {
        const rad = degreesToRad(rotation);
        const rotCos = Math.cos(rad);
        const rotSin = Math.sin(rad);
        const { x: ox, y: oy } = origin;
        const newX = (ox + (x - ox) * rotCos - (y - oy) * rotSin);
        const newY = oy + (x - ox) * rotSin + (y - oy) * rotCos;
        return new Vector(newX, newY);
    }

}
