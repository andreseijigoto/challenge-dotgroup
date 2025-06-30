<template>
  <span class="app-icon" :class="iconClass" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({
    name: 'AppIcon'
  })

  const props = defineProps({
    icon: {
      type: String,
      required: true
    },
    library: {
      type: String,
      default: 'mdi'
    }
  })

  const iconClass = computed(() => `${props.library} ${props.library}-${props.icon}`)
</script>

<style lang="scss" scoped>
  .app-icon {
    align-items: center;
    color: inherit;
    display: flex;
    font-size: 1rem;
    justify-content: center;
  }
</style>
