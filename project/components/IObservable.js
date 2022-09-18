const equalDeep = (x, y) => JSON.stringify(x) === JSON.stringify(y)

export default class IObservable extends HTMLElement {
    get archives() {
        if (!this.hasAttribute('archives')) return []

        return JSON.parse(this.getAttribute('archives'))
    }

    set archives(value) {
        if (this.constructor.observedAttributes.includes('archives')
            && !equalDeep(this.archives, value)) {
            this.setAttribute('archives', JSON.stringify(value))
        }
    }

    get currentFilter() {
        if (!this.hasAttribute('current-filter')) return 'All'

        return this.getAttribute('current-filter')
    }

    set currentFilter(value) {
        if (this.constructor.observedAttributes.includes('current-filter')
            && this.currentFilter !== value) {
            this.setAttribute('current-filter', value)
        }
    }

    connectAttributes() {
        window
            .applicationContext
            .observableState
            .addChangeListener(state => {
                this.archives = state.archives
                this.currentFilter = state.currentFilter
            })
    }

    attributeChangedCallback() {
        this.updateContent()
    }
}