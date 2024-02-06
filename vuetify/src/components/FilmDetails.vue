<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        :scrim="false"
    >
        <v-card>
            <v-toolbar
                dark
                color="deep-purple-lighten-3"
            >
                <v-toolbar-title class="justify-center">{{ filmDetails.title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                    dark
                    class="float-end"
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>

            </v-toolbar>

            <v-container>
                <v-row no-gutters>
                    <v-col class="v-col-3">
                        <v-sheet class="pa-2 ma-2">
                            <v-img :src="`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`"
                                   width="250px"></v-img>
                            <v-btn class="mt-5 float-end" size="medium" color="grey" icon="mdi-heart"
                                   @click=""></v-btn>
                        </v-sheet>
                    </v-col>
                    <v-col class="v-col-9">
                        <v-sheet class="pa-2 ma-2">
                            {{ filmDetails.overview }}
                            <v-spacer></v-spacer>
                            Дата выхода в прокат: {{ filmDetails.release_date }}
                            <v-spacer></v-spacer>
                            Продолжительность: {{ filmDetails.runtime }} минут
                            <v-spacer></v-spacer>
                            Рейтинг: {{ filmDetails.vote_average }}
                            <v-spacer></v-spacer>
                            <template v-if="anyRecommendation">
                                Рекомендации
                                <v-container>
                                    <v-row>
                                        <v-sheet v-for="recommendedFilm in recommendedFilms">
                                            <v-img
                                                :src="`https://image.tmdb.org/t/p/w500${recommendedFilm.poster_path}`"
                                                width="105px" class="ma-1"></v-img>
                                        </v-sheet>
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
        isFavoriteFilm: Boolean
    },

    data() {
        return {
            dialog: false,
            id: null,
            filmDetails: null,
            recommendedFilms: null
        }
    },

    computed: {
        anyRecommendation() {
            return this.recommendedFilms.length !== 0
        }
    },

    methods: {
        show(id) {
            this.id = id;
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


