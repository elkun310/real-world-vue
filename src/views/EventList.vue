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
import Nprogress from 'nprogress';

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
  beforeRouteEnter (routeTo, routeFrom, next) {
    Nprogress.start();
    EventService.getEvents(parseInt(routeTo.query.limit) || 2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next(comp => {
          comp.events = response.data;
          comp.totalEvents = response.headers['x-total-count'];
        })
      })
      .catch(() => {
        next({
          name: 'networkError',
        })
      })
      .finally(() => {
        Nprogress.done();
      })
  },
  beforeRouteUpdate (routeTo) {
    Nprogress.start();
    EventService.getEvents(parseInt(routeTo.query.limit) || 2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.events = response.data;
        this.totalEvents = response.headers['x-total-count'];
      })
      .catch(() => {
        return {
          name: 'networkError',
        }
      })
      .finally(() => {
        Nprogress.done();
      })
  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents / 2);
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
  justify-content: space-between;
}
.pagination a {
  /* flex: 1; */
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
