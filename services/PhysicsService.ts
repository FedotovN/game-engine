import GameObjectsService from "./GameObjectsService";
import Rigidbody from "../models/components/Rigidbody";
import Collider from "../models/components/Collider";
class PhysicsService {
    constructor() {}
    move(deltaTime: number) {
        GameObjectsService.gameObjects.forEach(go => {
           const rb = go.getComponent('rigibody') as Rigidbody;
           if (rb) {
               rb.move(deltaTime);
           }
        });
    }
    collide() {
        const goWithCollider = [...GameObjectsService.gameObjects].filter(go => go.getComponent('collider'));

        goWithCollider.forEach(x => {
            const xc = x.getComponent('collider') as Collider;
            goWithCollider.forEach(y => {
                if (y === x) return;
                const yc = y.getComponent('collider') as Collider;
                xc.checkCollision(yc);
            });
        });
    }
}
export default new PhysicsService();
