import GameObjectComponent, { GameObjectComponentOptions } from "../GameObjectComponent";
import Mesh from "../Mesh/Mesh";
import RenderService from "../../services/RenderService";
import GameObject from "../../models/GameObject";
export default class MeshRenderer extends GameObjectComponent {
    private _mesh: Mesh | null = null;
    constructor(props?: GameObjectComponentOptions) {
        super(props);
        this.name = 'meshRenderer';
    }
    set mesh(mesh: Mesh) {
        this._mesh = mesh;
        RenderService.drawables.add(this._mesh);
    }
    get mesh() { return this._mesh }
    setGameObject(go: GameObject) {
        super.setGameObject(go);
        this._mesh.translate = this._gameObject.translate;
    }
    cleanup() {
        super.cleanup();
        this.removeMesh();
    }

    removeMesh() {
        RenderService.drawables.delete(this._mesh);
    }
}
