import GameObject from "./GameObject";
import GameObjectComponentName from "../types/GameObjectComponentName";
export type GameObjectComponentOptions = {
    gameObject?: GameObject
}
export default class GameObjectComponent {
    name: GameObjectComponentName;
    protected _gameObject: GameObject
    constructor(props?: GameObjectComponentOptions) {
        if (!props) return;
        if (props.gameObject) this._gameObject = props.gameObject;
    }
    setGameObject(go: GameObject) {
        this._gameObject = go;
    }
    cleanup() {}
}
