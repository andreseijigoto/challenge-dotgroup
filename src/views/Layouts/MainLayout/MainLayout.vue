<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <TheMenubar
        @openFavorites="openFavorites"
        @openCheckout="openCheckout"
        @search="searchMovies"
        :disable-checkout="isCheckoutView"
        :disable-favorites="isFavoritesView"
      />
    </header>

    <main class="main-layout__container">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { computed, type ComputedRef } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'

  import { TheMenubar } from '@/components'

  defineOptions({
    name: 'MainLayout'
  })

  const { dispatch } = useStore()
  const route = useRoute()

  const isCheckoutView: ComputedRef<boolean> = computed(() => route.name === 'Checkout')
  const isFavoritesView: ComputedRef<boolean> = computed(() => route.name === 'Favorites')

  const searchMovies = (value: string) => {
    dispatch('system/setLoading', true)

    setTimeout(() => {
      dispatch('movie/getMovieList', { query: value })
    }, 500)
  }

  const openFavorites = () => {
    dispatch('system/setFavorites', true)
  }

  const openCheckout = () => {
    dispatch('system/setCheckout', true)
  }
</script>

<style lang="scss" scoped>
  .main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &__header {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    &__container {
      flex-grow: 1;
    }
  }
</style>
