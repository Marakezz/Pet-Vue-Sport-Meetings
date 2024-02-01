<script setup>
defineProps({
  name: String
})
const emit = defineEmits(['logout'])
</script>

<template>
  <div class="bg-white justify-between flex">
    <button
      @click="emit('logout')"
      class="mx-2 cursor-pointer border-solid border-2 border-gray-400"
    >
      Выйти из профиля
    </button>
    <span class="font-bold text-right pr-4 mx-2">
      {{ name }}
    </span>
  </div>
</template>
