<script setup>
import { ref, onMounted } from 'vue'
import Meeting from './Meeting.vue'
defineProps({
  meetings: Array
})

const emit = defineEmits(['onChangeSelect', 'onSortChecked'])
const sortCheckBox = ref(false)

onMounted(async () => {})
</script>

<template>
  <div class="w-3/4 mx-auto mt-4 h-full bg-slate-100" v-auto-animate>
    <h4 class="mt-2 mx-auto text-center font-extrabold">Все мероприятия:</h4>
    <div class="flex">
      <div class="sm:m-auto sm:w-auto ml-2 w-48">
        Выберите вид спорта:
        <select
          @change="(event) => emit('onChangeSelect', event.target.value)"
          class="py-2 px-3 border rounded-md outline-none"
          name="sport"
        >
          <!-- <option selected></option> -->
          <option value="">Все</option>
          <option value="Football">Футбол</option>
          <option value="Hockey">Хоккей</option>
          <option value="Volleyball">Волейбол</option>
          <option value="Basketball">Баскетбол</option>
          <option value="Other">Другое</option>
        </select>
      </div>
      <label class="sm:m-auto mt-4">
        <input
          ref="sortCheckBox"
          type="checkbox"
          @input="(event) => emit('onSortChecked', event.target.checked)"
        />
        Отсортировать по дате
      </label>
    </div>

    <div class="mt-4 xl:mt-0 lg:flex m-auto ml-4 mr-4 mb-2 justify-between">
      <div class="flex">
        <div class="bg-red-500 w-4 h-4 my-auto"></div>
        - мероприятие уже началось или прошло
      </div>
      <div class="flex">
        <div class="bg-red-200 w-4 h-4 my-auto"></div>
        - до мероприятия осталось меньше недели
      </div>
      <div class="flex">
        <div class="bg-gray-100 w-4 h-4 my-auto border-2"></div>
        - до мероприятия осталось больше недели
      </div>
    </div>
    <router-link class="flex" to="/meeting-creating-page">
      <button
        class="2xl:fixed 2xl:right-64 mx-auto mt-2 font-bold border-2 p-1 border-gray-500 hover:rounded-sm hover:shadow-2xl hover:bg-slate-200"
      >
        Создать событие
      </button>
    </router-link>
    <div class="mt-2 2xl:mt-0">
      <Meeting
        v-for="(item, index) in meetings"
        :key="item.id"
        :index="index"
        :id="item.id"
        :author="item.author"
        :description="item.description"
        :sport="item.sport"
        :players-list="item.playersList"
        :place="item.place"
        :date="item.date"
      />
    </div>
  </div>
</template>
