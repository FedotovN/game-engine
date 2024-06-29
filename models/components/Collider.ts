import SAT from "sat";
import Vector from "../Vector";
import PolygonShape from "../Shape/PolygonShape";
import GameObjectComponent, { GameObjectComponentOptions } from "../GameObjectComponent";

type ColliderOptions = {
    shape: PolygonShape,
}

export default class Collider extends GameObjectComponent {
    shape: PolygonShape;
    private _collisionCallbacks: ((collider: Collider, collisionPoint: Vector) => void)[] = [];
    constructor(props: GameObjectComponentOptions & ColliderOptions) {
        super(props);
        this.name = 'collider';
        this.shape = props.shape;
    }
    checkCollision(collider: Collider) {
        if (!this._gameObject || collider == this) return false;
        const currPolygon = this._turnShapeIntoSATPolygon(this.shape, this._gameObject.translate.position, this._gameObject.translate.rotation);
        const targetPolygon = this._turnShapeIntoSATPolygon(collider.shape, collider._gameObject.translate.position, collider._gameObject.translate.rotation);
        let response: SAT.Response = new SAT.Response();
        if(SAT.testPolygonPolygon(currPolygon, targetPolygon, response)) {
            // const normOverlap = response.overlapN.normalize();
            const collisionPoint = new Vector(response.overlapV.x, response.overlapV.y);
            this._collisionCallbacks.forEach(cb => cb(collider, collisionPoint));
        }

    }
    onCollision(cb: (collider: Collider, collisionPoint: Vector) => void) {
        this._collisionCallbacks.push(cb);
    }
    getGameObject() {
        return this._gameObject;
    }
    _turnShapeIntoSATPolygon(shape: PolygonShape, position: Vector, rotation: number): SAT.Polygon {
        const shapePoints = shape.getPointsPosition(Vector.zero(), rotation);
        const polygonPoints = shapePoints.map(p => {
            const { x, y } = p;
            return new SAT.Vector(x, y);
        });
        return new SAT.Polygon(
            new SAT.Vector(position.x, position.y),
            polygonPoints
        );
    }
}
