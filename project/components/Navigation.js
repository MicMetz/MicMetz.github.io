import IObservable from './IObservable.js'


export default class Navigation extends IObservable {
    static get observedAttributes() {
        return ['archives', 'current-filter']
    }

    connectedCallback() {
        this.template = document
            .getElementById('navigation-bar')

        window.requestAnimationFrame(() => {
            const content = this.template
                .content
                .firstElementChild
                .cloneNode(true)

            this.appendChild(content)
        })

        this.connectAttributes()
    }

    updateContent() {
        const filters = this.querySelectorAll('a')
        const currentFilter = this.currentFilter

        filters.forEach(filter => {
            const filterName = filter
                .getAttribute('data-filter')

            if (filterName === currentFilter) {
                filter.classList.add('selected')
            } else {
                filter.classList.remove('selected')
            }
        })
    }
}
