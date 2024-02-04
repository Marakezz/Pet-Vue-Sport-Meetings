<script setup>
import { inject } from 'vue'
import axios from 'axios'
const sportModel = defineModel('sportModel')
const placeModel = defineModel('placeModel')
const descriptionModel = defineModel('descriptionModel')
const dateModel = defineModel('dateModel')
const user = inject('user')
const isLoged = inject('isLoged')

const meetingCreated = async () => {
  if (!isLoged.value) {
    alert('Сначала войдите в профиль')
  } else {
    if (!user.isAdmin && user.numberOfCreatedMeetings >= 2) {
      alert(
        'Вы не можете создавать больше 2 мероприятий. Купите подписку чтобы создавать больше :D'
      )
    } else {
      const obj = {
        author: user.name,
        sport: sportModel.value,
        place: placeModel.value,
        date: dateModel.value,
        description: descriptionModel.value,
        playersList: [
          {
            id: 1,
            mainId: user.id,
            name: user.name
          }
        ]
      }
      const { data } = await axios.post(`https://09aef11d7b814e84.mokky.dev/meetings`, obj)
      const { data1 } = await axios.patch(`https://09aef11d7b814e84.mokky.dev/users/${user.id}`, {
        numberOfCreatedMeetings: user.numberOfCreatedMeetings + 1
      })

      user.numberOfCreatedMeetings++
      sportModel.value = ''
      placeModel.value = ''
      dateModel.value = ''
      descriptionModel.value = ''
      alert('Успешно создано')
    }
  }
  // console.log(Date.now())
  // console.log(dateModel.value)
}
</script>

<template>
  <div class="w-3/4 mx-auto mt-4 h-full bg-slate-100" v-auto-animate>
    <h1 class="font-bold">Введите данные о своем событии:</h1>
    <form class="mt-4 ml-2" @submit.prevent="">
      <div>
        Вид спорта:
        <select
          v-model="sportModel"
          required
          class="py-2 px-3 border rounded-md outline-none"
          name="sport"
          id="1"
        >
          <option value="Football">Футбол</option>
          <option value="Hockey">Хоккей</option>
          <option value="Volleyball">Волейбол</option>
          <option value="Basketball">Баскетбол</option>
          <option value="Other">Другое</option>
        </select>
      </div>
      <div class="mt-4">
        Место проведения:
        <input v-model="placeModel" required type="text" placeholder="Место проведения" />
      </div>
      <div class="mt-4">
        Введите описание:
        <input v-model="descriptionModel" class="w-5/6" type="text" placeholder="Описание" />
      </div>
      <div class="mt-4">
        Введите дату проведения:
        <input
          v-model="dateModel"
          required
          class="ml-2"
          type="datetime-local"
          :min="new Date().toISOString().slice(0, 16)"
        />
      </div>

      <button
        v-if="isLoged"
        @click="meetingCreated"
        class="mt-4 bg-zinc-200 font-bold border-separate border-2"
      >
        Создать
      </button>
      <h2 v-if="!isLoged" class="mt-4 text-red-600">Чтобы создать мероприятие войдите в систему</h2>
    </form>
  </div>
</template>
