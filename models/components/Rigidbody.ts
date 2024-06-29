import Vector from "../Vector";
import GameObjectComponent, { GameObjectComponentOptions } from "../../models/GameObjectComponent";

export default class Rigidbody extends GameObjectComponent {
    velocity: Vector = Vector.zero();
    friction?: number = .02;
    rotationVelocity?: number = 0;
    rotationFriction?: number = .02;

    constructor(props: GameObjectComponentOptions) {
        super(props);
        this.name = 'rigibody';
    }
    move(deltaTime: number) {
        if (!this._gameObject) return;
        this._moveGameObject(deltaTime);
        this._rotateGameObject(deltaTime);
    }
    push(x: number, y: number) {
        this.velocity.x += x;
        this.velocity.y += y;
    }
    turn(power: number) {
        this.rotationVelocity += power;
    }
    private _moveGameObject(deltaTime: number) {
        const { x, y } = this._gameObject.translate.position;
        this._gameObject.translate.setPosition(new Vector(x + this.velocity.x * deltaTime, y + this.velocity.y * deltaTime));

        this.velocity.x *= (1 - this.friction * deltaTime);
        this.velocity.y *= (1 - this.friction  * deltaTime);
    }
    private _rotateGameObject(deltaTime: number) {
        this._gameObject.translate.rotation += this.rotationVelocity * deltaTime;
        this.rotationVelocity *= (1 - this.rotationFriction * deltaTime);
    }
}
