function createTextNode(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                return typeof child === "string" ? createTextNode(child) : child
            })
        }
    }
}
function render(el, container) {
    // 刚开始render任务
    nextWork = {
        dom: container,
        props: {
            children: [el]
        }
    }
    root = nextWork
    // const dom = el.type === "TEXT_ELEMENT"
    //     ? document.createTextNode('')
    //     : document.createElement(el.type);
    // // 设置props
    // Object.keys(el.props).forEach(key => {
    //     if (key !== 'children') {
    //         dom[key] = el.props[key]
    //     }
    // })
    // const children = el.props.children
    // children.forEach(child => {
    //     render(child, dom)
    // });
    // container.append(dom)

}

let nextWork, root
function workLoop(deadLine) {
    let shouldYieId = false
    while (!shouldYieId && nextWork) {

        // 任务执行函数，返回下一个任务
        nextWork = performWorkOfUnit(nextWork)
        // 剩余毫秒数 〉1 - 渲染
        shouldYieId = deadLine.timeRemaining() < 1;
    }
    // 在nextWork为null时，代表链表返回null结束
    if (!nextWork && root) {
        commitDom()
    }
    requestIdleCallback(workLoop)
}

// 实现统一提交
function commitDom() {
    commitFiber(root.child)
    root = null
}
function commitFiber(fiber) {
    if(!fiber) return
    fiber.parent.dom.append(fiber.dom)
    commitFiber(fiber.child)
    commitFiber(fiber.sibling)
}
function performWorkOfUnit(work) {
    if (!work.dom) {
        // 1.创建dom
        const dom = (work.dom = work.type === "TEXT_ELEMENT"
            ? document.createTextNode('')
            : document.createElement(work.type));

        // work.parent.dom.append(dom)

        // 2.处理props
        Object.keys(work.props).forEach(key => {
            if (key !== 'children') {
                dom[key] = work.props[key]
            }
        })
    }
    // 3.处理children创建fiber结构
    const children = work.props.children;
    let preChild
    children.forEach((child, index) => {
        const newWork = {
            type: child.type,
            props: child.props,
            child: null,
            parent: work,
            sibling: null,
            dom: null
        }
        // 第一个孩子
        if (index === 0) {
            work.child = newWork
        } else {
            // 绑定兄弟关系
            preChild.sibling = newWork
        }
        preChild = newWork
    });
    // 4.返回下一个任务, 如果有孩子返回，否则返回兄弟，不然返回叔叔
    if (work.child) {
        return work.child
    }
    if (work.sibling) {
        return work.sibling
    }

    return work.parent?.sibling
}

requestIdleCallback(workLoop)

const React = {
    render,
    createElement

}
export default React
