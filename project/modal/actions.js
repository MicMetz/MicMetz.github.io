export default state => {
    const addArchive = archive => {
        if (!archive) return

        state.archives = [...state.archives, {
            ...archive
        }]
    }

    const changeFilter = currentFilter => {
        state.currentFilter = currentFilter
    }

    return {
        addArchive,
        changeFilter
    }
}