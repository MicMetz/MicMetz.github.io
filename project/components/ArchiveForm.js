import IObservable from './IObservable.js'

export default class ArchiveForm extends IObservable {
    static get observedAttributes() {
        return [
            'current-filter'
        ]
    }

    connectedCallback() {
        this.template = document
            .getElementById('archive-form')
        const content = this.template
            .content
            .firstElementChild
            .cloneNode(true)

        this.appendChild(content)

        this.form = this.querySelector('form')
        this.form.querySelector('input').focus()

        this.form
            .addEventListener('keypress', e => {
                if (e.key === 'Enter') {
                    const inputs = this.form.querySelectorAll('input')
                    const select = this.form.querySelector('select')

                    if (!this.isValid(inputs)) return

                    console.log('Pressed Enter: ' +
                        inputs[0].value + '|' +
                        inputs[1].value + '|' +
                        (select.value === 'Topic' ? '' : select.value))

                    this.addArchive({
                        title: inputs[0].value,
                        keyword: inputs[1].value,
                        topic: select.value === 'Topic' ? '' : select.value
                    })

                    this.resetForm(inputs)
                }
            })

        this.form
            .addEventListener('change', e => {
                if (e.target.matches('select.search')
                    && e.target.value !== 'Search by') {
                    console.log('Filter by: ' + e.target.value)
                    this.changeFilter(e.target.value)
                }
            })

        super.connectAttributes()
    }

    isValid(inputs) {
        let isInvalid = false

        inputs.forEach(i => {
            if (i.value && i.checkValidity()) {
                i.classList.remove('is-invalid')
                i.classList.add('is-valid')
            } else {
                i.classList.remove('is-valid')
                i.classList.add('is-invalid')
                isInvalid = true
            }
        })

        return !isInvalid
    }

    resetForm(inputs) {
        inputs.forEach(i => {
            i.value = ''
            i.classList.remove('is-valid')
        })
        inputs[0].focus()
    }

    addArchive(archive) {
        window
            .applicationContext
            .actions
            .addArchive(archive)
    }

    changeFilter(filter) {
        window
            .applicationContext
            .actions
            .changeFilter(filter)
    }

    updateContent() {
        if (this.currentFilter !== 'All') {
            this.form.querySelector('select').value = this.currentFilter
        }
        this.resetForm(this.form.querySelectorAll('input'))
    }
}