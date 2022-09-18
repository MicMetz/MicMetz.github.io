import ArchiveGrid from './components/ArchiveGrid.js'
import ArchiveForm from './components/ArchiveForm.js'
import Navigation from './components/Navigation.js'
import App from './components/App.js'

import observableFactory from './modal/observable.js'
import actionsFactory from './modal/actions.js'

const INITIAL_STATE = {
    archives: [],
    currentFilter: 'All'
}

const observableState = observableFactory(INITIAL_STATE)
const actions = actionsFactory(observableState)

window.applicationContext = Object.freeze({
    observableState,
    actions
})


const pages = Pages()

function Pages() {
    const pages = document.querySelectorAll('.page')

    const showPage = page => {
        pages.forEach(p => {
            if (p.id === page) {
                p.classList.remove('d-none')
            } else {
                p.classList.add('d-none')
            }
        })
    }

    return {
        showPage
    }
}


window.addEventListener('load', () => {
    customElements.define('title-row', class extends HTMLElement {
        connectedCallback() {
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = `
                <style> h1 {font-weight: bold;}</style>
                <h1>${this.getAttribute('name')}</h1>
            `;
        }
    });
    customElements.define('archive-grid', ArchiveGrid)
    customElements.define('archive-form', ArchiveForm)
    customElements.define('navigation-bar', Navigation)
    customElements.define('web-app', App)
})
