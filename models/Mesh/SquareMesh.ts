import PolygonMesh, { PolygonMeshOptions } from "./PolygonMesh";
import SquareShape from "../Shape/SquareShape";

export default class SquareMesh extends PolygonMesh {
    constructor(props: Omit<PolygonMeshOptions, 'shape'> & { size?: number }) {
        const shape = new SquareShape({ size: props.size });
        super({ ...props, shape });
    }
}
