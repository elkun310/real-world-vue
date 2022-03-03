<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link :to="{name: 'EventList', query: {page: page - 1, limit: limit}}"
      rel="prev"
      v-if="page != 1"
      id="page-prev"
      >&#60; Prev</router-link>

      <router-link :to="{name: 'EventList', query: {page: page + 1, limit: limit}}"
      rel="next"
      v-if="hasNextPage"
      id="page-next"
      >Next &#62;</router-link>
    </div>

    <select name="" id="per-page" @change="changeLimit($event)">
      <option :value="2">2</option>
      <option :value="3">3</option>
      <option :value="4">4</option>
    </select>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '../services/EventService'
import {watchEffect} from 'vue';

export default {
  name: 'EventList',
  props: ['page', 'limit'],
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents : 0,
    }
  },
  methods: {
    changeLimit(event) {
      this.$router.push('?limit='+event.target.value+'&page=' + this.page)
    }
  },
  created() {
    watchEffect(() => {
      this.events = null;
      EventService.getEvents(this.limit, this.page)
            .then((response) => {
              this.events = response.data;
              this.totalEvents = response.headers['x-total-count'];
            })
            .catch((error) => {
              console.log(error)
            })
    })
  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents / 2)
      return this.page < totalPages;
    }
  }
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e52;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
