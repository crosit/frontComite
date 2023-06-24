const actions = {
    incrementAction(context) {
        context.commit('increment')
    },
    getUrlAction(context, url) {
        context.commit('setUrl', url)
    },
    setUserAction(context, user) {
        context.commit('setUser', user)
    }
}

export default actions