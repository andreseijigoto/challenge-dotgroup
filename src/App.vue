<template>
  <RouterView />
  <TheLoader :show="isLoadingOpened" />
</template>

<script setup lang="ts">
  import { onBeforeMount, computed, ref, type Ref } from 'vue'
  import { RouterView } from 'vue-router'
  import { useStore } from 'vuex'
  import { useDeviceSize, useDeviceScroll } from './providers/composables'
  import { TheLoader } from './components'

  const { dispatch, state } = useStore()
  const { setDeviceSize } = useDeviceSize()
  const { setDeviceScroll } = useDeviceScroll()

  const isLoadingOpened: Ref<boolean> = ref(computed(() => state.system.isLoadingOpened))

  window.addEventListener('resize', () => {
    setDeviceSize(window.innerWidth)
  })

  window.addEventListener('scroll', (event) => {
    setDeviceScroll((event.target as Document).documentElement.scrollTop)
  })

  onBeforeMount(() => {
    setDeviceSize(window.innerWidth)

    dispatch('user/getAccount')
    dispatch('movie/getGenres')
    dispatch('movie/getMovieList')
  })
</script>

<style lang="scss" scoped></style>
