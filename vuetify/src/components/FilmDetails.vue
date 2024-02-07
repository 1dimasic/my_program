<template>
    <v-dialog v-model="dialog"
              fullscreen
              :scrim="false">
        <v-card>
            <v-toolbar color="deep-purple-lighten-3">
                <v-toolbar-title class="justify-center text-h5">{{ filmDetails.title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn class="float-end" @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-container>
                <v-row no-gutters>
                    <v-col class="v-col-3">
                        <v-sheet class="pa-2 ma-2">
                            <v-img :src="`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`"></v-img>
                            <v-btn flat size="large"
                                   :color="favoriteAddButtonColor"
                                   class="float-end mt-3"
                                   @click="this.$emit('add')">{{ favoriteAddButtonText }}
                            </v-btn>
                        </v-sheet>
                    </v-col>
                    <v-col class="v-col-9 text-h5">
                        <v-sheet class="pa-2 ma-2">
                            {{ filmDetails.overview }}
                            <v-spacer class="mb-3"></v-spacer>
                            Дата выхода в прокат: {{ filmDetails.release_date }}
                            <v-spacer class="mb-3"></v-spacer>
                            Продолжительность: {{ filmDetails.runtime }} минут
                            <v-spacer class="mb-3"></v-spacer>
                            Рейтинг: {{ filmDetails.vote_average }}
                            <v-spacer class="mb-3"></v-spacer>
                            <template v-if="anyRecommendation">
                                Рекомендации
                                <v-container>
                                    <v-row>
                                        <v-col lg="2"
                                               md="3"
                                               sm="4"
                                               xs="12"
                                               v-for="recommendedFilm in recommendedFilms">
                                            <v-img :src="`https://image.tmdb.org/t/p/w500${recommendedFilm.poster_path}`"
                                                    width="180px"
                                                    class="ma-1">
                                            </v-img>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </template>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";

export default {
    props: {
        film: Object,
        isFavoriteFilm: Boolean
    },

    data() {
        return {
            currentFilm: this.film,
            dialog: false,
            filmDetails: null,
            recommendedFilms: null
        }
    },

    computed: {
        anyRecommendation() {
            return this.recommendedFilms.length !== 0
        },

        favoriteAddButtonText() {
            return this.isFavoriteFilm ? "Удалить" : "Добавить"
        },

        favoriteAddButtonColor() {
            return this.isFavoriteFilm ? "teal" : "deep-purple-lighten-1"
        }
    },

    methods: {
        show() {
            this.getFilmDetails();
            this.getRecommendedFilms();
        },

        getFilmDetails() {
            axios.get(`https://api.themoviedb.org/3/movie/${this.currentFilm.id}`, {
                params: {
                    api_key: "e54fe9c197f033da85a056da00280567",
                    language: "ru"
                }
            }).then(response => {
                this.filmDetails = response.data;
            }).catch(() => alert("Не удалось загрузить детали"));
        },

        getRecommendedFilms() {
            axios.get(`https://api.themoviedb.org/3/movie/${this.currentFilm.id}/recommendations`, {
                params: {
                    api_key: "e54fe9c197f033da85a056da00280567",
                    language: "ru"
                }
            }).then(response => {
                this.recommendedFilms = response.data.results;
                this.dialog = true;
            }).catch(() => alert("Не удалось загрузить рекомендации"));
        }
    }
}
</script>


