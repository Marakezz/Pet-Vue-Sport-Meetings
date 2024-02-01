<script setup>
defineProps({
  id: Number,
  author: String,
  description: String,
  sport: String,
  playerList: Array,
  place: String,
  date: String
})
</script>

<template>
  <router-link
    :to="{
      name: 'MeetingPage',
      params: {
        id: id
      }
    }"
  >
    <div
      class="w-2/3 text-center cursor-pointer m-auto mb-2 py-4 h-16 border-separate border-2 border-gray-200 hover:shadow-md"
    >
      <p>
        {{ id }}) <b>{{ sport }}</b> meeting by <b>{{ author }}</b> on the
        <ins
          ><b>{{ place }}</b></ins
        >
      </p>
    </div>
  </router-link>
</template>
