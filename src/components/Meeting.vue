<script setup>
import { inject } from 'vue'
const props = defineProps({
  id: Number,
  index: Number,
  author: String,
  description: String,
  sport: String,
  playersList: Array,
  place: String,
  date: String
})

const remainingTime = Date.parse(props.date) - Date.now()

const user = inject('user')
const deleteMeeting = inject('deleteMeeting')
let sportImg = ''
let sportTypeOnRussian = ''
switch (props.sport) {
  case 'Football':
    sportImg = 'football.svg'
    sportTypeOnRussian = 'Футбол'
    break
  case 'Volleyball':
    sportImg = '/volleyball.svg'
    sportTypeOnRussian = 'Воллейбол'
    break
  case 'Basketball':
    sportImg = '/basketball.svg'
    sportTypeOnRussian = 'Баскетбол'
    break
  case 'Hockey':
    sportImg = '/hockey.svg'
    sportTypeOnRussian = 'Хоккей'
    break
  case 'Other':
    sportImg = '/other.svg'
    sportTypeOnRussian = 'Прочее'
    break
}
</script>

<template>
  <div class="flex">
    <div
      :class="
        remainingTime < 0
          ? 'w-2/3 m-auto mb-2 bg-red-500'
          : remainingTime < 604800000
            ? 'w-2/3 m-auto mb-2 bg-red-200'
            : 'w-2/3 m-auto mb-2 bg-gray-100'
      "
    >
      <router-link
        :to="{
          name: 'MeetingPage',
          params: {
            id: id
          }
        }"
      >
        <div
          class="flex 2xl:block text-center cursor-pointer py-4 border-separate border-2 border-gray-200 hover:shadow-md"
        >
          <img class="2xl:absolute w-10" :src="sportImg" alt="sport" />
          <div class="mr-2">
            <p>
              {{ index + 1 }}) Событие по виду спорта: <b>{{ sportTypeOnRussian }}</b
              >. Организатор: <b>{{ author }}</b
              >. Место проведения:
              <ins
                ><b>{{ place }}</b></ins
              >
            </p>
            <div>
              Дата проведения: <b>{{ date.slice(0, 10) }} {{ date.slice(11, 16) }}</b>
            </div>
            <div>Количество игроков: {{ props.playersList.length }}</div>
          </div>
        </div>
      </router-link>
    </div>

    <img
      v-if="user.isAdmin && props.id > 2"
      @click="deleteMeeting(props.id)"
      class="w-10 hover:bg-gray-200 mr-2"
      src="/cross.svg"
      alt="X"
    />
  </div>
</template>
