import Vector from "../Vector";
import UserInterfaceService from "../../services/UserInterfaceService";

export type UIElementProps = {
    width: number;
    height: number;
    position: Vector;
}
export default abstract class UserInterfaceElement {
    width: number;
    height: number;
    position: Vector;
    abstract content: any;
    constructor({ width, height, position }: UIElementProps) {
        this.width = width;
        this.height = height;
        this.position = position;
    }
    abstract addToRoot(htmlRoot: Element, blockSet: Set<UserInterfaceElement>): void;
    abstract remove(): void;
    abstract setContent(content: typeof this.content): void;
}
