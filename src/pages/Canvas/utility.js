
export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export function getMouseCoord(clientX, clientY, canvas) {
    let rect = canvas.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    return new Point(x, y);
}