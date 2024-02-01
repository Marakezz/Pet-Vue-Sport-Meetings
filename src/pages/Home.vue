<script setup>
import { ref, onMounted } from 'vue'
import MeetingList from '../components/MeetingList.vue'
import axios from 'axios'

const meetings = ref([])

const fetchMeetings = async () => {
  try {
    const { data } = await axios.get('https://09aef11d7b814e84.mokky.dev/meetings')
    meetings.value = data.map((obj) => ({
      ...obj
    }))
  } catch (err) {
    console.log(err)
  }
  // console.log(meetings.value)
}

onMounted(async () => {
  await fetchMeetings()
})
</script>

<template>
  <div>
    <router-link to="/meeting-creating-page">
      <button class="fixed right-72 mt-2 font-bold border-2 p-1 border-gray-500">
        Создать событие
      </button>
    </router-link>
    <MeetingList :meetings="meetings" />
  </div>
</template>
