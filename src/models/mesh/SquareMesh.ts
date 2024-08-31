import PolygonMesh, { PolygonMeshOptions } from "@/models/mesh/PolygonMesh";
import SquareShape from "@/models/shape/SquareShape";

export default class SquareMesh extends PolygonMesh {
    constructor(props: Omit<PolygonMeshOptions, 'shape'> & { size?: number }) {
        const shape = new SquareShape({ size: props.size });
        const options = { ...props, shape };
        super(options);
    }
}
