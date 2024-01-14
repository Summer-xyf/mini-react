
function workLoop(deadLine) {
    let shouldYieId = false
    while (!shouldYieId) {
        console.log(556);
        // 剩余毫秒数 〉1 - 渲染
        shouldYieId = deadLine.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)