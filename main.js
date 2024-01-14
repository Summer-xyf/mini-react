import React from './core/React.js'
import ReactDom from './core/ReactDom.js'
// 实现页面app
// 1.创建一个app组件
// const dom = document.createElement('div');
// dom.id = 'app'

// document.querySelector('#root').append(dom);
// // 创建文本
// const textEl = document.createTextNode('')
// textEl.nodeValue = 'app'
// dom.append(textEl);

// vnode el类型 el-props（id，class，children, ..） 
// const textNode = {
//     type: "TEXT_ELEMENT",
//     props: {
//         nodeValue: "app",
//         children: []
//     }
// }
function createTextNode(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}
// const el = {
//     type: 'div',
//     props: {
//         id: 'app',
//         children: [textNode]
//     },
// }
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

// const dom = document.createElement(el.type);
// dom.id = el.props.id

// document.querySelector('#root').append(dom);
// // 创建文本
// const textEl = document.createTextNode('')
// textEl.nodeValue = el.props.children[0].props.nodeValue
// dom.append(textEl);

// // el 
// function render(el, root) {
//     const dom = el.type === "TEXT_ELEMENT"
//         ? document.createTextNode('')
//         : document.createElement(el.type);
//     // 设置props
//     Object.keys(el.props).forEach(key => {
//         if (key !== 'children') {
//             dom[key] = el.props[key]
//         }
//     })
//     const children = el.props.children
//     children.forEach(child => {
//         render(child, dom)
//     });
//     root.append(dom)

// }

const root = document.querySelector('#root');
const el = React.createElement('div', { id: 'app' }, 'hi-','app')
console.log(el);
ReactDom.createRoot(root).render(el)