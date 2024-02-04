<script setup>
import { ref } from 'vue'
const emit = defineEmits(['login', 'registration'])

const isLoggining = ref(false)
const isChosenTypeOfEntry = ref(false)
const nameModel = defineModel('nameModel')
const passwordModel = defineModel('passwordModel')
const passwordRepeatModel = defineModel('passwordRepeatModel')
const cityModel = defineModel('cityModel')

const loginClicked = () => {
  isChosenTypeOfEntry.value = true
  isLoggining.value = true
}
const registrationClicked = () => {
  isChosenTypeOfEntry.value = true
  isLoggining.value = false
}
</script>

<template>
  <div
    class="mx-10 mt-4 p-2 border-solid border-gray-500 border-2 rounded-md text-center"
    v-auto-animate
  >
    <div v-if="!isChosenTypeOfEntry">
      <button
        @click="loginClicked"
        class="bg-zinc-200 font-bold mr-4 border-separate border-2 hover:bg-green-200 hover:shadow-xl"
      >
        Вход
      </button>
      <button
        @click="registrationClicked"
        class="bg-zinc-200 font-bold border-separate border-2 hover:bg-green-200 hover:shadow-xl"
      >
        Регистрация
      </button>
    </div>

    <div v-if="isLoggining && isChosenTypeOfEntry">
      <form class="mb-4" @submit.prevent="">
        <h2 class="font-bold">Спортивные мероприятия города Vue-city! Welcome!</h2>
        <input
          required
          v-model="nameModel"
          type="text"
          placeholder="Name"
          class="mr-4 mb-2 border-separate border-2"
        />
        <input
          v-model="passwordModel"
          required
          type="password"
          placeholder="Password"
          class="mr-4 border-separate border-2 sm:mb-0 mb-4"
        />
        <button
          class="bg-zinc-200 font-bold border-separate border-2 block m-auto sm:inline-block"
          @click="emit('login', { nameModel, passwordModel })"
        >
          Отправить
        </button>
      </form>
      <button @click="registrationClicked" class="bg-zinc-200 font-bold border-separate border-2">
        Регистрация
      </button>
    </div>
    <div v-if="!isLoggining && isChosenTypeOfEntry">
      <form class="flex-col" @submit.prevent="">
        <h2 class="font-bold">Спортивные мероприятия города Vue-city! Welcome!</h2>
        <input
          required
          v-model="nameModel"
          type="text"
          placeholder="Name"
          class="mr-4 mb-2 border-separate border-2"
        />
        <input
          v-model="passwordModel"
          required
          type="password"
          placeholder="Password"
          class="mr-4 mb-2 border-separate border-2"
        />
        <input
          v-model="passwordRepeatModel"
          required
          type="password"
          placeholder="Повторите пароль"
          class="mr-4 mb-2 border-separate border-2"
        />
        <input
          required
          v-model="cityModel"
          type="text"
          placeholder="City"
          class="mr-4 mb-2 border-separate border-2"
        />
        <button
          class="bg-zinc-200 font-bold border-separate border-2 block m-auto md:inline-block"
          @click="
            emit('registration', { nameModel, passwordModel, passwordRepeatModel, cityModel })
          "
        >
          Отправить
        </button>
      </form>
      <button @click="loginClicked" class="mt-4 bg-zinc-200 font-bold border-separate border-2">
        Вход
      </button>
    </div>
  </div>
</template>
