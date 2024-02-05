<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    dark
                    color="primary"
                >
                    <v-btn
                        dark
                        @click="dialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ filmDetails.title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-img :src="`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`" width="250px"></v-img>
                    {{ filmDetails.overview }}
                    <v-spacer></v-spacer>
                    Дата выхода в прокат: {{ filmDetails.release_date }}
                    <v-spacer></v-spacer>
                    Продолжительность: {{ filmDetails.runtime }} минут
                    <v-spacer></v-spacer>
                    Рейтинг: {{ filmDetails.vote_average }}
                    <v-spacer></v-spacer>
                    <div v-if="abc">
                        <v-col v-for="recommendedFilm in recommendedFilms">
                            <span>{{ recommendedFilm.title }}</span>
                            <v-img :src="`https://image.tmdb.org/t/p/w500${recommendedFilm.poster_path}`"
                                   width="100px"></v-img>
                        </v-col>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>


<script>
import axios from "axios";

export default {
    data() {
        return {
            dialog: false,
            id: null,
            filmDetails: null,
            recommendedFilms: null
        }
    },

    computed: {
        abc() {
            return this.recommendedFilms.length !== 0
        }
    },

    methods: {
        show(filmId) {
            this.id = filmId;
            this.getFilmDetails();
            this.getRecommendedFilms();
        },

        getFilmDetails() {
            axios.get(`https://api.themoviedb.org/3/movie/${this.id}`, {
                params: {
                    api_key: "e54fe9c197f033da85a056da00280567",
                    language: "ru"
                }
            }).then(response => {
                this.filmDetails = response.data;
            }).catch(() => alert("Не удалось загрузить детали"));
        },

        getRecommendedFilms() {
            axios.get(`https://api.themoviedb.org/3/movie/${this.id}/recommendations`, {
                params: {
                    api_key: "e54fe9c197f033da85a056da00280567",
                    language: "ru",
                    page: 1
                }
            }).then(response => {
                this.recommendedFilms = response.data.results;
                alert(this.recommendedFilms.length);
                this.dialog = true;
            }).catch(() => alert("Не удалось загрузить рекомендации"));
        }
    }
}
</script>


