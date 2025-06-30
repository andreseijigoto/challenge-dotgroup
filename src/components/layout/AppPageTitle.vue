<template>
  <h1 class="app-page-title">{{ title }}</h1>
</template>

<script setup>
  defineOptions({
    name: 'AppPageTitle'
  })

  const props = defineProps({
    title: {
      type: String,
      default: ''
    }
  })
</script>

<style scoped lang="scss">
  .app-page-title {
    font-size: var(--title-font-size);
    font-weight: bold;

    &:not(:last-child) {
      margin: 0 0 1rem;

      @media #{$md-only} {
        margin: 0 0 1.5rem;
      }
    }
  }
</style>
