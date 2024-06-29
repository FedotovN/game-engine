import UserInterfaceElement from "../models/UI/UserInterfaceElement";

export default class UserInterfaceService {
    private _uiRoot: Element;
    private _uiElements: Set<UserInterfaceElement> = new Set();
    constructor(public uiRootSelector: string) {
        this._uiRoot = document.querySelector(uiRootSelector);
        if (!this._uiRoot) {
            console.error(`No UI root with selector ${uiRootSelector} were found`);
            return;
        }
    }
    addUIBlock(block: UserInterfaceElement) {
        block.addToRoot(this._uiRoot, this._uiElements);
        this._uiElements.add(block);
    }
}
