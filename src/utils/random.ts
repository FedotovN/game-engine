export function negativeRandom(negative: number, positive: number) {
    return (Math.random() * positive) + (Math.random() * negative);
}
export function minRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
