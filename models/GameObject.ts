import GameObjectComponent from "../models/GameObjectComponent";
import GameObjectComponentName from "../types/GameObjectComponentName";
import GameObjectsService from "../services/GameObjectsService";
import Translate from "../models/Translate";

export type GameObjectOptions = {
    name?: string,
    id?: string,
}

export default class GameObject {
    translate: Translate = new Translate();
    name: string;
    id: string;
    private _children: Set<GameObject> = new Set<GameObject>();
    private _components: { [key in GameObjectComponentName | string]: GameObjectComponent } = {};
    constructor(props?: GameObjectOptions) {
        if (props) {
            const { name, id } = props;
            this.name = name;
            this.id = id;
        }
    }
    setComponent(component: GameObjectComponent) {
        this._components[component.name] = component;
        component.setGameObject(this);
    }
    getComponent(name: GameObjectComponentName) {
        return this._components[name];
    }
    addChild(child: GameObject) {
        this.translate.addChild(child.translate);
        this._children.add(child)
    }
    removeChild(childId: string): void;
    removeChild(child: GameObject | string) {
        if (typeof child === 'number') {
            const childToRemove = [...this._children].find((c) => c.id === child);
            this._children.delete(childToRemove);
            return;
        }
        if (child instanceof GameObject) {
            this._children.delete(child);
        }
    }
    onInstantiate() {}
    onUpdate(deltaTime: number) {}
    instantiate() {
        GameObjectsService.instantiate(this);
    }
    destroy() {
        this._children.forEach((child) => {
            GameObjectsService.destroy(child);
        });
        Object.keys(this._components).forEach((key) => this._components[key].cleanup());
        GameObjectsService.destroy(this);
    }
}
