import { Camera } from "@/models";
import { DrawableEntity } from "@/models";

class RenderService {
    drawables: Set<DrawableEntity> = new Set();
    cameras: Set<Camera> = new Set();
    render() {
        this.cameras.forEach((camera) => {
            camera.render([...this.drawables]);
        });
    }
}
export default new RenderService();
