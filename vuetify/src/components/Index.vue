<template>
    <v-container>
        <button @click="checked">Проверить</button>
        <div>{{ }}</div>
        <v-row align="center" justify="center">
            <v-col
                v-for="popularFilm in popularFilms"
                :key="popularFilm.id"
                cols="3">
                <v-card
                    class="mx-auto"
                    max-width="350px"
                    :popularFilm="popularFilm">
                    <v-card-item>
                        <div>
                            <div class="mb-1">
                                {{ popularFilm.title }}
                            </div>
                            <div>
                                <v-img :src="`https://image.tmdb.org/t/p/w500${popularFilm.poster_path}`"
                                       width="230px"></v-img>
                            </div>
                            <div class="text-caption">{{ getGenresNames(popularFilm.genre_ids) }}</div>
                        </div>
                    </v-card-item>

                    <v-card-actions>
                        <v-btn @click="showFilmDetails(popularFilm.id)">Кнопка
                        </v-btn>
                        <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <film-details ref="filmDetailsModalDialog"></film-details>
</template>

<script>
import axios from "axios";
import FilmDetails from "@/components/FilmDetails.vue";

export default {
    name: "Index",

    components: {
        FilmDetails
    },

    data() {
        return {
            popularFilms: [],
            genres: [],
            check: null
        }
    },

    methods: {
        showFilmDetails(filmId){
            this.$refs.filmDetailsModalDialog.show(filmId);
        },

        getGenresNames(genresId) {
            return this.genres
                .filter(g => genresId.includes(g.id))
                .map(g => g.name)
                .slice(-3)
                .join(", ");
        },

        getPopularFilms() {
            axios.get("https://api.themoviedb.org/3/movie/popular", {
                params: {
                    api_key: "e54fe9c197f033da85a056da00280567",
                    language: "ru",
                    page: 1
                }
            }).then(response => {
                this.popularFilms = response.data.results;
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
        }
    },

    mounted() {
        this.getPopularFilms();
        this.getGenres();
    }
}
</script>
