<script setup>
import { ref, onMounted } from 'vue'
import Meeting from './Meeting.vue'
defineProps({
  meetings: Array
})

onMounted(async () => {})
</script>

<template>
  <div class="w-3/4 mx-auto mt-4 h-full bg-slate-100">
    <h4 class="mt-2 mx-auto text-center font-extrabold">Все мероприятия:</h4>
    <Meeting
      v-for="item in meetings"
      :key="item.id"
      :id="item.id"
      :author="item.author"
      :description="item.description"
      :sport="item.sport"
      :player-list="item.playerList"
      :place="item.place"
      :date="item.date"
    />
  </div>
</template>
