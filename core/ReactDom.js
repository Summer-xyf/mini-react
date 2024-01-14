import React from './React.js'
function createRoot(container) {
    return {
        render(app) {
            React.render(app, container)
        }
    }
}
const ReactDom = {
    createRoot
}

export default ReactDom