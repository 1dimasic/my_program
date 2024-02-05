<template>
    <v-app>
        <v-layout class="rounded rounded-md">
            <v-app-bar>
                <v-toolbar-title>Application bar</v-toolbar-title>
            </v-app-bar>

            <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
                <router-view/>
            </v-main>
        </v-layout>
    </v-app>
</template>

<script setup>
</script>
