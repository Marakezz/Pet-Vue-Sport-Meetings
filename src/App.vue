<script setup>
import { ref, onMounted, provide, watch, reactive } from 'vue'
import axios from 'axios'
import LogRegForm from './components/LogRegForm.vue'
import Header from './components/Header.vue'

// const meetings = ref([])
const users = ref([])
const user = reactive({
  id: null,
  name: '',
  passwordd: '',
  city: ''
})
const isLoged = ref(false)

const login = async (obj) => {
  if (obj.nameModel && obj.passwordModel && !isLoged.value) {
    const currentUser = users.value.find((item) => obj.nameModel === item.name)
    if (currentUser) {
      if (obj.passwordModel === currentUser.passwordd) {
        user.name = obj.nameModel
        user.passwordd = obj.passwordModel
        user.city = currentUser.city
        user.id = currentUser.id
        isLoged.value = true
      } else {
        alert('Неправильный пароль')
      }
    } else {
      alert('Нет такого пользователя')
    }
  }
  // await fetchUsers()
}

const registration = async (obj) => {
  if (
    obj.nameModel &&
    obj.passwordModel &&
    obj.passwordRepeatModel &&
    obj.cityModel &&
    !isLoged.value
  ) {
    if (users.value.some((item) => item.name === obj.nameModel)) {
      alert('Имя уже занято')
    } else {
      if (obj.passwordModel === obj.passwordRepeatModel) {
        user.name = obj.nameModel
        user.passwordd = obj.passwordModel
        user.city = obj.cityModel
        const { data } = await axios.post('https://09aef11d7b814e84.mokky.dev/users', user)
        isLoged.value = true
      } else {
        alert('Пароли не совпадают')
      }
    }
  }
  await fetchUsers()
}

const logout = () => {
  user.id = null
  user.name = ''
  user.passwordd = ''
  user.city = ''
  isLoged.value = false
}

const fetchUsers = async () => {
  try {
    const { data } = await axios.get('https://09aef11d7b814e84.mokky.dev/users')

    users.value = data.map((obj) => ({
      ...obj
    }))
    // user.value = users.value[0]
  } catch (err) {
    console.log(err)
  }
}

// const fetchMeetings = async () => {
//   try {
//     const { data } = await axios.get('https://09aef11d7b814e84.mokky.dev/meetings')
//     meetings.value = data.map((obj) => ({
//       ...obj
//     }))
//   } catch (err) {
//     console.log(err)
//   }
// }

onMounted(async () => {
  await fetchUsers()
  // await fetchMeetings()
})

// provide('meetings', meetings.value)
provide('user', user)
provide('isLoged', isLoged)
</script>

<template>
  <div class="">
    <router-link to="/">
      <div class="flex gap-4 ml-4 mt-2 cursor-pointer w-1/5 leading-9">
        <img class="w-10" src="/logo.svg" alt="logo" />
        <div class="">Центр спортивных мероприятий</div>
      </div>
    </router-link>
    <LogRegForm v-if="!isLoged" @login="login" @registration="registration" />
    <Header v-if="user.name" :name="user.name" @logout="logout" />
    <router-view></router-view>
    <!-- <MeetingList :meetings="meetings" /> -->
  </div>
</template>

<style scoped></style>
