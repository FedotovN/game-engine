import Vector from "./Vector";
import PolygonShape from "./Shape/PolygonShape";

export default class Translate {
    position: Vector = Vector.zero()
    rotation: number = 0;
    parentTranslate: Translate;

    children: Set<Translate> = new Set();
    getActualPosition(): Vector {
        if (!this.parentTranslate) return this.position;
        const { rotation, position } = this.parentTranslate;
        const { x, y } = this.position;
        const { x: px, y: py } = position;
        const biasedPos = new Vector(x + px, y + py);
        return PolygonShape.rotatePoint(biasedPos.x, biasedPos.y, rotation, position);
    }
    getActionRotation() {
        if (this.parentTranslate)
            return this.parentTranslate.rotation + this.rotation;
        return this.rotation;
    }
    setPosition(position: Vector) {
        this.position.x = position.x;
        this.position.y = position.y;
    }
    setRotation(rotation: number) {
        this.rotation = rotation;
    }
    addChild(child: Translate) {
        this.children.add(child);
        child.parentTranslate = this;
    }
}
