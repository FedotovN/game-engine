export function lerp(currentValue: number, destinationValue: number, time: number) {
    return currentValue * (1 - time) + destinationValue * time;
}
export function clamp(value: number, min: number, max: number) {
    if (value > max) return max;
    if (value < min) return min;
    return value;
}
