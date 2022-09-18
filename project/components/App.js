export default class App extends HTMLElement {
    connectedCallback() {
        this.template = document
            .getElementById('web-app')
        window.requestAnimationFrame(() => {
            const content = this.template
                .content
                .firstElementChild
                .cloneNode(true)
            this.appendChild(content)
        })
    }
}