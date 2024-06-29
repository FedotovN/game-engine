import TickService from "./TickService";

type InputListenerOptions = {
    keyCode: string,
    onDown?: () => void,
    onUp?: () => void,
    once?: boolean,
};
class InputService {

    setListener(options: InputListenerOptions) {
        const { keyCode, onDown, onUp, once } = options;
        let rerenderCallbackUnsub: Function;
        function handleKeyDown(event: KeyboardEvent) {
            if (event.repeat) return;
            if (event.code !== keyCode) return;
            if (onDown && !once)
                rerenderCallbackUnsub = TickService.onUpdate(onDown);
            else onDown()
        }

        function handleKeyUp(event: KeyboardEvent) {
            if (event.code !== keyCode) return;
            if (onDown && !once)
                rerenderCallbackUnsub?.();
            if (onUp)
                onUp();
        }
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    };
}
export default new InputService();
