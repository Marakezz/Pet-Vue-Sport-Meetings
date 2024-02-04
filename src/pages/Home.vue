<script setup>
import { ref, onMounted, provide, inject, reactive, watch } from 'vue'
import MeetingList from '../components/MeetingList.vue'
import axios from 'axios'

const meetings = ref([])
const user = inject('user')
const filters = reactive({
  sortBy: '',
  typeQuery: ''
})

const fetchMeetings = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.typeQuery) {
      params.sport = `*${filters.typeQuery}*`
    }
    const { data } = await axios.get('https://09aef11d7b814e84.mokky.dev/meetings', {
      params
    })
    meetings.value = data.map((obj) => ({
      ...obj
    }))
  } catch (err) {
    console.log(err)
  }
  // console.log(meetings.value)
}

const deleteMeeting = async (id) => {
  if (user.isAdmin) {
    const { data } = await axios.delete(`https://09aef11d7b814e84.mokky.dev/meetings/${id}`)
    await fetchMeetings()
  }
}

const onChangeSelect = (elem) => {
  filters.typeQuery = elem
}
const onSortChecked = (elem) => {
  if (elem) {
    filters.sortBy = 'date'
  } else {
    filters.sortBy = ''
  }
}

provide('deleteMeeting', deleteMeeting)

onMounted(async () => {
  await fetchMeetings()
})

watch(filters, fetchMeetings)
</script>

<template>
  <div>
    <MeetingList
      :meetings="meetings"
      @on-change-select="onChangeSelect"
      @on-sort-checked="onSortChecked"
    />
  </div>
</template>
