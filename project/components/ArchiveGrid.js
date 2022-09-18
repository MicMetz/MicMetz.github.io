import IObservable from './IObservable.js'

export default class ArchiveGrid extends IObservable {
    static get observedAttributes() {
        return [
            'archives',
            'current-filter'
        ]
    }

    connectedCallback() {
        this.template = document
            .getElementById('archive-grid')
        this.rowTemplate = document
            .getElementById('archive-row')
        const content = this.template
            .content
            .firstElementChild
            .cloneNode(true)
        this.appendChild(content)

        this.table = this.querySelector('table')
        this.updateContent()

        super.connectAttributes()
    }

    getArchiveRow(archive) {
        const {
            title,
            keyword,
            topic
        } = archive

        const element = this.rowTemplate
            .content
            .firstElementChild
            .cloneNode(true)
        const columns = element.querySelectorAll('td')

        columns[0].textContent = title
        columns[1].textContent = keyword
        columns[2].textContent = topic

        if (this.currentFilter !== 'All'
            && topic !== this.currentFilter) {
            element.style.display = 'none'
        }

        return element
    }

    updateContent() {
        this.table.style.display =
            (this.archives?.length ?? 0) === 0
                ? 'none'
                : ''

        this.table
            .querySelectorAll('tbody tr')
            .forEach(r => r.remove())

        this.archives
            .map(a => this.getArchiveRow(a))
            .forEach(e => this.table
                .querySelector('tbody')
                .appendChild(e))
    }
}