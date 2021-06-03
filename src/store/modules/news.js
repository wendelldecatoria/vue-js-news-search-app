import { NewsApi } from '../../services/newsApi';

const state = () => ({
    articles: [],
    sources: [],
    country: '',
    category: '',
    keyword: '',
    errors: []

})

//to handle state
const getters = {
    getSourceData(state) {
        return state.sources
    }
}

//to handle actions
const actions = {
    async getArticles({ commit, state }) {
        // loop through the sources state
        let sources = []

        Object.entries(state.sources).map(item => {
            sources.push(item[1]['id'])
        })

        let params = {
            apiKey: `84d7b5fc689d48bc863ad87b31c80d47`,
            keyword: state.keyword,
            sources: sources.join()
        }
    
        await NewsApi.get(`/everything`, { params })
        .then(response => {
            // console.log(response.data.articles);
            commit('SET_ARTICLES', response.data.articles)
        })
        .catch(e => {
            commit('SET_ERROR', e)
        })
    },

    async getSources({ commit, state }) {
        let params = {
            apiKey: `84d7b5fc689d48bc863ad87b31c80d47`,
            country: state.country,
            category: state.category
        }
    
        await NewsApi.get(`/sources`, { params })
        .then(response => {
            commit('SET_SOURCES', response.data.sources)
        })
        .catch(e => {
            // console.log(e)
            commit('SET_ERROR', e)
        })
    },

    fetchNews() {
        this.dispatch('news/getSources').then(() => {    
            return this.dispatch('news/getArticles');
        });
    },

    setCategory ({ commit }, category) {
        commit('SET_CATEGORY', category)
    },

    setCountry ({ commit }, country) {
        commit('SET_COUNTRY', country)
    }, 

    setKeyword ({ commit }, keyword) {
        commit('SET_KEYWORD', keyword)
    },

    setError ({ commit }, error) {
        commit('SET_ERROR', error)
    }
}

//to handle mutations
const mutations = {
    SET_ARTICLES(state, articles) {
        state.articles = articles
    },
    SET_SOURCES(state, sources) {
        state.sources = sources
    },
    SET_CATEGORY(state, category) {
        state.category = category
    },
    SET_COUNTRY(state, country) {
        state.country = country
    },
    SET_KEYWORD(state, keyword) {
        state.keyword = keyword
    },
    SET_ERROR(state, error) {
        state.error = error
    }
}

//export store module
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}