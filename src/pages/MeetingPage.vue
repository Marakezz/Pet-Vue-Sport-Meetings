<script setup>
import axios from 'axios'
import { onMounted, ref, inject, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const meeting = ref({})
const players = ref([])
const user = inject('user')
const isLoged = inject('isLoged')
// const isSignedUp = computed(() => {
//   if (!isLoged) return false
//   return players.value.some((item) => item.mainId === user.id)
// })
const isSignedUp = computed(() => players.value.some((item) => item.mainId === user.id))

const signUpToMeeting = async () => {
  // if (isLoged.value) {
  //   const obj = {
  //     id: players.value[players.value.length - 1].id + 1,
  //     name: user.name
  //   }
  //   players.value.push(obj)
  //   const { data } = await axios.patch(
  //     `https://09aef11d7b814e84.mokky.dev/playersList/${route.params.id}`,
  //     {
  //       players: players.value
  //     }
  //   )
  // } else {
  //   alert('Сначала войдите в профиль')
  // }
  if (isLoged.value) {
    if (isSignedUp.value) {
      alert('Ты уже записан')
    } else {
      const obj = {
        id: players.value.length ? players.value[players.value.length - 1].id + 1 : 1,
        mainId: user.id,
        name: user.name
      }
      players.value.push(obj)
      const { data } = await axios.patch(
        `https://09aef11d7b814e84.mokky.dev/meetings/${route.params.id}`,
        {
          playersList: players.value
        }
      )
    }
  } else {
    alert('Сначала войдите в профиль')
  }
}

const unSignUpFromMeeting = async () => {
  players.value = players.value.filter((player) => player.mainId !== user.id)
  const { data } = await axios.patch(
    `https://09aef11d7b814e84.mokky.dev/meetings/${route.params.id}`,
    {
      playersList: players.value
    }
  )
}

const fetchMeetingPage = async () => {
  // try {
  //   const { data } = await axios.get(
  //     `https://09aef11d7b814e84.mokky.dev/playersList?id=${route.params.id}&_relations=meetings`
  //   )
  //   meeting.value = data[0].meeting
  //   players.value = data[0].players
  // } catch (err) {
  //   console.log(err)
  // }
  try {
    const { data } = await axios.get(
      `https://09aef11d7b814e84.mokky.dev/meetings/${route.params.id}`
    )
    meeting.value = data
    players.value = meeting.value.playersList
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchMeetingPage()
})
</script>
<template>
  <div class="bg-white w-2/3 mx-auto">
    <!-- <h2>{{ $route.params }}</h2> -->
    <h2
      class="text-center cursor-pointer mx-auto align-middle mb-2 py-4 h-16 border-separate border-2 border-gray-200"
    >
      <b>{{ meeting.sport }}</b> meeting by <b>{{ meeting.author }}</b> on the
      <ins
        ><b>{{ meeting.place }}</b></ins
      >
    </h2>
    <h2 class="ml-4">Список игроков:</h2>
    <div class="flex justify-between">
      <div>
        <div class="ml-4" v-for="(player, index) in players" :key="player.id">
          {{ index + 1 }}) {{ player.name }}
        </div>
      </div>
      <button
        v-if="!isSignedUp"
        @click="signUpToMeeting"
        class="mr-4 mb-2 font-bold border-2 border-green-500"
      >
        Записаться
      </button>
      <button
        v-else
        @click="unSignUpFromMeeting"
        class="mr-4 mb-2 font-bold border-2 border-green-500"
      >
        Отписаться
      </button>
    </div>
  </div>
</template>
