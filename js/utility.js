
export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export function getMouseCoord(e, canvas) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return new Point(x, y);
}