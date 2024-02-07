<template>
    <v-layout class="rounded rounded-md">
        <v-main class="d-flex align-center justify-center">
            <v-app-bar color="deep-purple-lighten-3">
                <v-toolbar-title class="text-h5 v-col-6">Популярное кино</v-toolbar-title>
                <v-text-field class="v-col-2 mt-5"
                              variant="outlined"
                              v-model.trim="searchingString"
                              clearable></v-text-field>
                <v-btn @click="go">Favorite</v-btn>
            </v-app-bar>
            <v-infinite-scroll :onLoad="getPopularFilms">
                <v-container>
                    <v-row align="center" justify="center">
                        <v-col xl="2"
                               lg="3"
                               md="4"
                               sm="6"
                               xs="12"
                               v-for="popularFilm in popularFilms"
                               :key="popularFilm.id">
                            <film :film="popularFilm" :genres="genres"></film>
                        </v-col>
                    </v-row>
                </v-container>
            </v-infinite-scroll>
        </v-main>
    </v-layout>
</template>

<script>
import axios from "axios";
import Film from "@/components/Film.vue";

export default {
    name: "Index",

    components: {
        Film,
    },

    data() {
        return {
            popularFilms: [],
            page: 0,
            genres: [],
            searchingString: ""
        }
    },

    watch: {
        searchingString(newSearchingString) {
            this.searchFilms(newSearchingString);
        }
    },

    methods: {
        searchFilms() {
            _.debounce(function (abc) {
                popularFilms
            }, 500)
        },

        getPopularFilms() {
            axios.get("https://api.themoviedb.org/3/movie/popular", {
                params: {
                    api_key: "e54fe9c197f033da85a056da00280567",
                    language: "ru",
                    page: ++this.page
                }
            }).then(response => {
                this.popularFilms = this.popularFilms.concat(response.data.results);
            }).catch(() => alert("Не удалось загрузить фильмы"));
        },

        getGenres() {
            axios.get("https://api.themoviedb.org/3/genre/movie/list", {
                params: {
                    api_key: "e54fe9c197f033da85a056da00280567",
                    language: "ru"
                }
            }).then(response => {
                this.genres = response.data.genres;
            }).catch(() => alert("Не удалось загрузить наименования жанров"));
        },
    },

    mounted() {
        this.getPopularFilms();
        this.getGenres();
    }
}
</script>
<style scoped>
</style>
