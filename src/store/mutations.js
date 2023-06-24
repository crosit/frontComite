const mutations = {
    increment(state) {
        state.contador++
    },
    setUrl(state, url){
        state.url = url
    },
    setUser(state, user){
        state.user = user
    },
    
}

export default mutations