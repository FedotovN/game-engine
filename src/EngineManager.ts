import GameObjectsService from "./services/GameObjectsService";
import TickService from "./services/TickService";
import PhysicsService from "./services/PhysicsService";
import RenderService from "./services/RenderService";

export default class EngineManager {

    private _updateCallbacks: Set<(deltaTime: number) => void> = new Set();

    constructor() {
        TickService.onUpdate(({ deltaTime }: { deltaTime: number }) => this._onTick(deltaTime));
    }
    start() {
        TickService.start();
    }
    onUpdate(callback: (deltaTime: number) => void) {
        this._updateCallbacks.add(callback);
    }
    private _onTick(deltaTime: number) {
        GameObjectsService.update(deltaTime);

        this._updateCallbacks.forEach(c => c(deltaTime));

        RenderService.render();
        PhysicsService.collide();
        PhysicsService.move(deltaTime);
    }
}
