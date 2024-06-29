import Vector from "../models/Vector";

type AudioServiceTrack = {
    name: string,
    audio: HTMLAudioElement,
    mediaSource?: MediaElementAudioSourceNode,
    nodes?: AudioNode[],
}
class AudioService {
    tracks: Set<AudioServiceTrack> = new Set();
    listenerPosition: Vector;
    private _audioContext: AudioContext;
    private _onAudioContextInitCallbacks: Set<Function> = new Set();
    private _noSourceTracks: Set<AudioServiceTrack> = new Set();
    getTrack(name: string) {
        return [...this.tracks].find((track) => track.name === name);
    }
    add({ name, resolvedSrc }: { name: string, resolvedSrc: string }) {
        const audio = document.createElement('audio');
        audio.src = resolvedSrc;
        const newTrack: AudioServiceTrack = { name, audio, nodes: [] };
        this._noSourceTracks.add(newTrack);
        this.tracks.add(newTrack);
    }
    async play(name: string) {
        try {
            const track = this.getTrack(name);
            if (!track) {
                console.warn(`Track with name ${name} not found.`);
                return;
            }
            await this._createAudioContext();
            this._onAudioContextInit(async () => {
                this._connectMediaSources();
                this._connectTrackAudioNodes(name);
                await track.audio.play();
            })
        } catch (e) {
            console.error(e);
        }
    }
    addPosition(name: string, position: Vector) {
        const track = this.getTrack(name);
        if (!track) {
            console.warn(`Track with name ${name} not found.`);
            return;
        }
        this._onAudioContextInit(() => {
            const foundPannerNode = track.nodes.find((node) => node instanceof PannerNode) as PannerNode;
            const pannerNode: PannerNode = foundPannerNode || new PannerNode(this._audioContext);
            const soundVector = new Vector(this.listenerPosition.x - position.x, this.listenerPosition.y - position.y);
            const distanceFactor = soundVector.getLength() / 300;
            const { x, y } = soundVector.normalize();
            pannerNode.positionX.value = -x * distanceFactor;
            pannerNode.positionZ.value = y * distanceFactor;

            if (!foundPannerNode) track.nodes.push(pannerNode);
        })
    }
    addGain(name: string, value: number) {
        const track = this.getTrack(name);
        if (!track) {
            console.warn(`Track with name ${name} not found.`);
            return;
        }
        this._onAudioContextInit(() => {
            const foundGainNode = track.nodes.find((node) => node instanceof GainNode) as GainNode;
            const gainNode = foundGainNode || new GainNode(this._audioContext);
            gainNode.gain.value = value;
            if (!foundGainNode) track.nodes.push(gainNode);
        });
    }
    async stopAndPlay(name: string) {
        this.stop(name);
        await this.play(name)
    }
    pause(name: string) {
        this.getTrack(name).audio.pause();
    }
    stop(name: string) {
        const track = this.getTrack(name)
        if (!track) {
            console.warn(`Track with name ${name} not found.`);
            return;
        }
        track.audio.pause();
        track.audio.currentTime = 0;
    }
    private _connectTrackAudioNodes(name: string) {
        const track = this.getTrack(name);
        function connectAudioNodes(currNode: AudioNode, nodes: AudioNode[]) {
            if (!nodes.length) return currNode;
            const nextNode = nodes[nodes.length - 1];
            return connectAudioNodes(currNode.connect(nextNode), nodes.slice(0, -1));
        }
        return connectAudioNodes(track.mediaSource, track.nodes).connect(this._audioContext.destination);
    }
    private _onAudioContextInit(cb: Function) {
        if(this._audioContext) {
            cb();
        }
        this._onAudioContextInitCallbacks.add(cb);
    }
    private _connectMediaSources() {
        if (this._noSourceTracks.size === 0) return;
        this._noSourceTracks.forEach((track) => this._connectTrackToAudioContext(track.name));
    }
    private async _createAudioContext() {
        if (this._audioContext) return this._audioContext.resume();
        this._audioContext = new AudioContext();
        this._onAudioContextInitCallbacks.forEach((cb) => cb());
    }
    private _connectTrackToAudioContext(name: string) {
        const track = this.getTrack(name);
        if (!track.mediaSource) {
            track.mediaSource = this._audioContext.createMediaElementSource(this.getTrack(name).audio);
        }
    }

}
export default new AudioService();
