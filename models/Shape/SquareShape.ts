import PolygonShape, { ShapeOptions } from "./PolygonShape";
import Vector from "../Vector";

export default class SquareShape extends PolygonShape {
    constructor(props: Omit<ShapeOptions, 'points'> & { size?: number }) {
        const { size } = props;
        const s = size ?? 10;
        const points: Vector[] = [
            new Vector(-s / 2, -s / 2),
            new Vector(s / 2, -s / 2),
            new Vector(s / 2, s / 2),
            new Vector(-s / 2, s / 2),

        ];
        super({ points, scale: props.scale });
    }

}
