<template>
<div>Test</div>
</template>

<script>
import {defineStore} from "pinia/dist/pinia";

export const usefavoriteFilmsStore = defineStore("favoriteFilms", {
    state() {
        return {
            favoriteFilms: []
        }
    },

    actions: {
        addFilmToFavoriteFilmsStore(film) {
            this.favoriteFilms.push(film);
        },

        removeFilmFromFavoriteFilmsStore(film) {
            this.favoriteFilms = this.favoriteFilms.filter(f => f.id !== film.id);
        },
    }
});
</script>
