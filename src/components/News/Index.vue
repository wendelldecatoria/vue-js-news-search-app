<template>
    <div>
        <div class="header">
            <h2 class="vertical-align">Vue Js News Search Application</h2>
        </div>
        <div class="select-container">
            <select name="country" v-model="selectedCountry" class="select">
                <option v-for="country in countries" :value="country.value" :key="country.value">{{ country.name }}</option>
            </select>

            <select name="category" v-model="selectedCategory" class="select">
                <option v-for="category in categories" :value="category" :key="category">{{ category }}</option>
            </select>

            <input v-model="keyword" placeholder="Keyword" class="input">

            <button class="search-button" @click="fetchNews()">Search</button>
        </div>
        
        <div class="content">
            <div v-for="article in articles" :key="article.title" class="article">
                <div :style="{ backgroundImage: 'url(' + article.urlToImage + ')' }" id="thumbnail"></div>
                <h4 class="padded">{{ formatTitle(article.title) }}</h4>
                
                <h5 class="padded lighter-color">{{ article.source.id }}</h5>
                <p class="padded">{{ formatDescription(article.description) }}</p>

                <button class="read-button">Read more</button>

                <div class="foot-article">
                    <p class="padded vertical-align">Published: {{ formatDate(article.publishedAt) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import countries from '../../utilities/news/countries'
import categories from '../../utilities/news/categories'
import moment from 'moment'

export default {
  name: 'NewsComponent',
  data() {

    return {
        countries: null,
        categories: null,
        selectedCountry: null,
        selectedCategory: null,
        keyword: null
    }
  },
  created() {
    
    this.fetchNews()
    this.countries = countries;
    this.categories = categories;
  },

  mounted() {
    
  },

  computed: {
    ...mapState({
        articles: state => state.news.articles,
        errors: state => state.news.errors
    })
  },

  watch: {
    selectedCategory() {
        this.setCategory(this.selectedCategory)
    },
    selectedCountry() {
        this.setCountry(this.selectedCountry)
    },
    keyword() {
        this.setKeyword(this.keyword)
    },
    errors() {
        console.log("ERROR ERROR ERROR")
    }
  },
  
    methods: {
        ...mapActions('news', [
        'setCategory', 'setCountry', 'setKeyword'
        ]),
        fetchNews() {
            this.$store.dispatch('news/fetchNews').then(() => {    

            }).catch(e => {
            // TODO: setup error handling
            console.log(e)
        })
        },
        formatDate(date) {
            return moment(date).format('LLL')
        },
        formatTitle(title) {
            return title.length > 70 ? title.substring(0, 70) + '...' : title
        },
        formatDescription(description) {
            return description.length > 100 ? description.substring(0, 100) + '...' : description
        }
    }
}
</script>

<style scoped>

    .vertical-align {
        margin: 0;
        position: relative;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .header {
        background-color: #353A40;
        color: #fff;
        width: 100%;
        height: 100px;
        margin: auto;
    }
    
    .select-container{
        background-color: #A8A8A8;
        width: 100%;
        height: 50px;
        padding: 15px 0px 15px 0px;
        margin: 0px;
    }

    .select {
        width: 150px;
        height: 30px;
        border-radius: 3px;
        border: 0px;
        margin: 0px 10px 0px 10px;

        position: relative;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .input {
        width: 150px;
        height: 30px;
        border-radius: 3px;
        border: 0px;
        margin: 0px 10px 0px 10px;

        position: relative;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .search-button {
        width: 150px;
        height: 30px;
        background-color: #353A40;
        color: #FFF;
        border-radius: 3px;
        border: 0px;
        margin: 0px 10px 0px 10px;

        position: relative;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .read-button {
        width: 120px;
        height: 30px;
        background-color: #353A40;
        color: #FFF;
        border-radius: 3px;
        border: 0px;
        margin: 0px 10px 0px 10px;
        position:relative;
        left: 50%;
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        margin: 5px 0px 5px 0px;
    }

    button:active {
        background-color: #CCCCCC;
        color: #353A40;
    }

    input:focus {
       outline: none !important;
    }

    .article {
        background-color: #FFF;
        border-radius: 3px;
        padding: 0px;
        margin: 15px;
        width: 300px;
        height: auto;
        min-height: 520px;
        display: inline-block;
        overflow: auto;
        -webkit-box-shadow: 0 10px 6px -6px #777;
        -moz-box-shadow: 0 10px 6px -6px #777;
        box-shadow: 0 10px 6px -6px #777;

        text-align: left;
        position: relative;
    }
    
    #thumbnail {
        width: 300;
        height: 200px;
        background-color: #000;

    }

    .lighter-text {
        color: #ACAFB5;
    }

    .foot-article {
        background-color: #F7F7F7;
        width: 100%;
        height: 50px;
        margin: 0px;
        padding: 0px;
        position: absolute;
        bottom: 0px;
        font-size: 12px;

        -moz-box-shadow:    inset 0 0 3px #E1E1E1;
        -webkit-box-shadow: inset 0 0 3px #E1E1E1;
        box-shadow:         inset 0 0 3px #E1E1E1;
    }

    .padded {
        padding: 0px 15px 0px 15px;
    }
</style>