// const cloneDeep = x => JQuery.parseJSON(JQuery.toJSON(x))
const cloneDeep = x => JSON.parse(JSON.stringify(x))
const freeze = state => Object.freeze(cloneDeep(state))


/**
 * This function creates an observable state object.
 * The state object is a plain object that can be observed for changes.
 */
export default initialState => {
    // observers
    let obser = []

    // Proxy object to observe changes and notify observers
    const proxy = new Proxy(cloneDeep(initialState), {
        set: (target, name, value) => {
            target[name] = value
            obser.forEach(l => l(freeze(proxy)))
            return true
        }
    })

    // Return the observable state object
    proxy.addChangeListener = cb => {
        obser.push(cb)
        cb(freeze(proxy))
        return () => obser = obser.filter(el => el !== cb)
    }

    return proxy
}