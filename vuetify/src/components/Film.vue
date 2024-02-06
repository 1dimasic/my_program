<template>
    <v-card
        class="mx-auto"
        max-width="350px">
        <v-card-item>
            <div>
                <div class="mb-1">{{ film.title }}</div>
                <div>
                    <v-img :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`"
                           width="230px"></v-img>
                </div>
                <div class="text-caption">{{ getGenresNames(film.genre_ids) }}</div>
            </div>
        </v-card-item>
        <v-card-actions>
            <v-btn size="medium" color="green-lighten-1" icon="mdi-movie"
                   @click="showFilmDetails(film.id)"></v-btn>
            <v-spacer></v-spacer>
            <v-btn size="medium" :color="isFavoriteFilmButtonColor" icon="mdi-heart"
                   @click="addFilmToFavorite"></v-btn>
        </v-card-actions>
    </v-card>
    <film-details ref="filmDetailsModalDialog" :isFavoriteFilm="isFavoriteFilm"></film-details>
</template>

<script>
import FilmDetails from "@/components/FilmDetails.vue";

export default {
    name: "Film",

    data() {
        return {
            isFavoriteFilm: false
        }
    },

    components: {
        FilmDetails
    },

    props: {
        film: Object,
        genres: Array
    },


    computed: {
        isFavoriteFilmButtonColor(){
            return this.isFavoriteFilm ? "red" : "grey"
        }
    },

    methods: {
        showFilmDetails(id) {
            this.$refs.filmDetailsModalDialog.show(id);
        },

        getGenresNames(genresId) {
            return this.genres
                .filter(g => genresId.includes(g.id))
                .map(g => g.name)
                .join(", ");
        },

        addFilmToFavorite() {
            this.isFavoriteFilm = !this.isFavoriteFilm;
        }
    }
}
</script>

