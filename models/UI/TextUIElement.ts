import UserInterfaceElement, { UIElementProps } from "./UserInterfaceElement";
import UserInterfaceService from "../../services/UserInterfaceService";
export default class TextUIElement extends UserInterfaceElement {
    content: string;
    private _rootNode: Element;
    private _blocksSet: Set<UserInterfaceElement>;
    private _htmlNode: HTMLParagraphElement;
    constructor({ content, height, width, position}: UIElementProps & { content: string }) {
        super({ width, height, position, });
        this.content = content;
    }
    addToRoot(htmlRoot: Element, blockSet: Set<UserInterfaceElement>) {
        this._htmlNode = document.createElement('p');

        this._htmlNode.innerText = this.content;
        this._htmlNode.style.position = 'absolute';
        this._htmlNode.style.left = `${this.position.x}px`;
        this._htmlNode.style.top = `${this.position.y}px`;
        this._htmlNode.style.overflow = 'hidden';
        this._htmlNode.style.width = `${this.width}px`;
        this._htmlNode.style.height = `${this.height}px`;
        htmlRoot.appendChild(this._htmlNode);

        this._rootNode = htmlRoot;
        this._blocksSet = blockSet;
    }
    remove(){
        this._rootNode.removeChild(this._htmlNode);
        this._blocksSet.delete(this);
    }
    setContent(content: string) {
        this.content = content;
        this._htmlNode.innerText = this.content;
    }
}
