import GameObjectsService from "./services/GameObjectsService";
import TickService from "./services/TickService";
import PhysicsService from "./services/PhysicsService";
import UserInterfaceService from "./services/UserInterfaceService";
import RenderService from "./services/RenderService";

type GameOptions = {
    uiRootSelector?: string,
}
export default class EngineManager {
    userInterfaceService: UserInterfaceService;

    private _updateCallbacks: Set<(deltaTime: number) => void> = new Set();

    constructor(options?: GameOptions) {
        if (options) {
            const { uiRootSelector } = options;
            if (uiRootSelector)
                this.userInterfaceService = new UserInterfaceService(uiRootSelector);
        }

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
