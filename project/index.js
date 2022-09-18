import ArchiveGrid from './components/ArchiveGrid.js'
import ArchiveForm from './components/ArchiveForm.js'
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

window.customElements.define('archive-form', ArchiveForm)
window.customElements.define('archive-grid', ArchiveGrid)
window.customElements.define('web-app', App)