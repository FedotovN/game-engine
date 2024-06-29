import DrawableEntity from "../shared/DrawableEntity";

export default abstract class Mesh extends DrawableEntity {
    strokeStyle: string;
    fillStyle: string;
    lineWidth: number;
    glow: number;
    glowColor: string;
};
