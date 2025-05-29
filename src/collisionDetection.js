export function checkCollision(obj1Element, obj2Element) {
    const rect1 = obj1Element.getBoundingClientRect();
    const rect2 = obj2Element.getBoundingClientRect();

    // Check if there is NO OVERLAP
    if (rect1.left >= rect2.right || // rect1 is to the right of rect2
        rect1.right <= rect2.left || // rect1 is to the left of rect2
        rect1.top >= rect2.bottom || // rect1 is below rect2
        rect1.bottom <= rect2.top) { // rect1 is above rect2
        return false; // No collision
    } else {
        return true; // Collision!
    }
}
