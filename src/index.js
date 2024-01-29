import _ from 'lodash'
import printMe from './print.js'

console.log('ragdul')

function component() {
    const element = document.createElement('div')

    // Lodash,imported now by this scrpt
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    const btn = document.createElement('button')
    btn.innerHTML = 'Click me sdf s dfand check the console!'
    btn.onclick = printMe

    element.appendChild(btn)

    return element
}

document.body.appendChild(component())
