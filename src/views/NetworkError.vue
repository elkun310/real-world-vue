<template>
    <h1>Uh-Opps!</h1>
    <h3>It looks like you're experiencing some network issues, please take a breath and <a href="#" @click="$router.go(-1)">Click here</a> to try again</h3>
    <router-link :to="{ name: 'EventList'}">Back to the home page</router-link>
</template>
