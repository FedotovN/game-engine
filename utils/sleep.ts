export async function sleep(milliseconds: number) {
    return new Promise(res => setTimeout(res, milliseconds));
}
