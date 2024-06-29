import Translate from "../Translate";

export default abstract class DrawableEntity {
    translate: Translate;
    abstract draw({ context }: { context: CanvasRenderingContext2D }): void;
}
