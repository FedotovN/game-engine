import GameObject, { GameObjectOptions } from "./GameObject";
import Vector from "./Vector";
import { clamp, lerp } from "../utils/easing";
import DrawableEntity from "../models/shared/DrawableEntity";

type ScreenBorders = {
    left: number,
    right: number,
    top: number,
    bottom: number;
}
type CameraOptions = {
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    height: number,
    width: number,
    backgroundColor?: string,
    meshColor?: string,
    borders?: ScreenBorders;
} & GameObjectOptions
 export default class Camera extends GameObject {
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canvas: HTMLCanvasElement;
    private readonly _height: number;
    private readonly _width: number;

    target: GameObject;
    zoom: number = 1;
    backgroundColor: string = 'rgba(0, 0, 0, .1)';
    meshColor: string = 'white';
    lerp: number = 1;
    deadZoneX: number = 60;
    deadZoneY: number = 60;
    borders: ScreenBorders = {
        top: -Infinity,
        right: Infinity,
        bottom: Infinity,
        left: -Infinity
    };


    private _lastZoom: number = this.zoom;
     constructor({ context, canvas, backgroundColor, meshColor, borders, name, id, height, width }: CameraOptions) {
        super({ name, id});

        if (backgroundColor) this.backgroundColor = backgroundColor;
        if (meshColor) this.meshColor = meshColor;
        if (borders) this.borders = borders;

        this._context = context;
        this._canvas = canvas;

        this._canvas.height = height;
        this._canvas.width = width;

        this._height = height;
        this._width = width;
        this._context.scale(this.zoom, this.zoom);
    }
    worldToCameraPosition(point: Vector) {
        return new Vector(this.translate.position.x - point.x, this.translate.position.y - point.y);
    }
    render(objects: DrawableEntity[]) {
        this._clearCanvas();
        if (this.target) this.follow();
        // else this._translateCanvas(this.translate.position.negative());
        objects.forEach(obj => {
            obj.draw({ context: this._context });
        });
        this._context.restore();
    }
    setZoom(zoom: number) {
        if (zoom < 1) zoom = 1;
        this.zoom = zoom;
        this._context.scale(this.zoom / this._lastZoom, this.zoom / this._lastZoom);
        this._lastZoom = this.zoom;
    }
    _getScreenCenter(): Vector {
         return new Vector((this._width / 2) / this.zoom, (this._height / 2) / this.zoom)
    }
    private _translateCanvas(to: Vector) {
        this._context.save();
        this._context.translate(to.x, to.y);
    }
    follow() {
        this._context.save()
        const { x, y } = this.target.translate.position;
        if (this.translate.position.x - x > this.deadZoneX) {
            this.translate.position.x = lerp(this.translate.position.x, x + this.deadZoneX, this.lerp);
        } else if (this.translate.position.x - x < -this.deadZoneX) {
            this.translate.position.x = lerp(this.translate.position.x, x - this.deadZoneX, this.lerp);
        }
        if (this.translate.position.y - y > this.deadZoneY) {
            this.translate.position.y = lerp(this.translate.position.y, y + this.deadZoneY, this.lerp);
        } else if (this.translate.position.y - y < -this.deadZoneY) {
            this.translate.position.y = lerp(this.translate.position.y, y - this.deadZoneY, this.lerp);
        }
        const center = this._getScreenCenter();

        this.translate.position.x = clamp(this.translate.position.x, this.borders.left + center.x - 20, this.borders.right - center.x + 20);
        this.translate.position.y = clamp(this.translate.position.y, this.borders.top + center.y - 20 * this.zoom, this.borders.bottom - center.y + 20);

        const ctxX = this.translate.position.x - center.x;
        const ctxY = this.translate.position.y - center.y;
        this._translateCanvas(new Vector(-ctxX, -ctxY));
    }
    isInCamera(point: Vector) {
        const pos = this.worldToCameraPosition(point);
        return pos.x >= 0 && pos.x <= this._width && pos.y >= 0 && pos.y <= this._height;
    }
     private _clearCanvas() {
         this._context.fillStyle = this.backgroundColor;
         this._context.fillRect(0, 0, this._width, this._height);
         this._context.fillStyle = this.meshColor;
         this._context.strokeStyle = 'black';
     }
}
