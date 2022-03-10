<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>Edit event here</p>
  </div>
</template>

<script>
export default {
    props: ['event'],
}
</script>