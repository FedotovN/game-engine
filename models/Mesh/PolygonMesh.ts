import PolygonShape from "../Shape/PolygonShape";
import Translate from "../Translate";
import Mesh from "./Mesh";

export type PolygonMeshOptions = {
    shape?: PolygonShape,
    strokeStyle?: string,
    fillStyle?: string,
    lineWidth?: number,
    glow?: number,
    glowColor?: string;
};
type DrawOptions = {
    context: CanvasRenderingContext2D,
}
export default class PolygonMesh implements Mesh{
    translate: Translate = new Translate();
    shape: PolygonShape;
    strokeStyle: string;
    fillStyle: string;
    lineWidth: number;
    glow: number;
    glowColor: string;
    constructor(props: PolygonMeshOptions) {
        if(props.shape) this.shape = props.shape;
        this.fillStyle = props.fillStyle;
        this.strokeStyle = props.strokeStyle;
        this.lineWidth = props.lineWidth;
        this.glow = props.glow;
        this.glowColor = props.glowColor || 'white';
    }
    draw({ context }: DrawOptions) {
        if (!this.shape) return;
        const { strokeStyle, fillStyle, lineWidth, shadowBlur, shadowColor } = context;
        context.beginPath()
        context.shadowColor = this.glowColor as string;
        context.shadowBlur = this.glow;

        this.shape.getPointsPosition(this.translate.getActualPosition(), this.translate.getActionRotation()).forEach(p => {
            const { x, y } = p;
            context.lineTo(x, y);
        });
        context.strokeStyle = this.strokeStyle || strokeStyle;
        context.fillStyle = this.fillStyle || fillStyle;
        context.lineWidth = this.lineWidth || lineWidth;
        context.closePath();
        context.stroke();
        context.fill();
        context.strokeStyle = strokeStyle;
        context.fillStyle = fillStyle;
        context.lineWidth = lineWidth;
        context.shadowBlur = shadowBlur;
        context.shadowColor = shadowColor;
    }
}
