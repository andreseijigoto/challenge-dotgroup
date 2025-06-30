<template>
  <div class="home-view">
    <div class="home-view__container container">
      <AppOverlay :show="toggleLoading">
        <div class="home-view__movies-list grid">
          <div class="col-6 lg:col-3" v-for="movie in movies" :key="movie.id">
            <MovieCard class="movies-list__movie-card" :movie="movie" @click-add="movieAdd" />
          </div>
        </div>

        <AppPaginator class="home-view__paginator" v-model="page" :total="total" :per-page="20" />
      </AppOverlay>
    </div>

    <AppDrawer v-if="isCheckoutOpened" title="Meu Carrinho" @close="closeCheckout">
      <CheckoutList @click-remove="(index: number) => movieRemove(index)" />

      <template #footer>
        <div v-if="hasCartItems" class="home-view__resume">
          <span>Total:</span>
          <span class="home-view__value">{{ getMonetary(resumeValue) }}</span>
        </div>

        <AppButton
          class="home-view__button-submit"
          label="Finalizar Compra"
          :disabled="!hasCartItems"
          @click="openCheckout"
        />
      </template>
    </AppDrawer>
  </div>
</template>

<script setup lang="ts">
  import { computed, type ComputedRef, ref, type Ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { AppPaginator, AppOverlay } from '@/components'
  import { MovieCard, CheckoutList } from './components'
  import { AppButton, AppDrawer } from '@/components'

  import { useToast, useNumberHandler } from '@/providers/composables'
  import type { iMovie } from '@/providers/services'

  defineOptions({
    name: 'HomeView'
  })

  const { getters, state, dispatch } = useStore()
  const { toast } = useToast()
  const { getMonetary } = useNumberHandler()
  const router = useRouter()

  const isCheckoutOpened: Ref<boolean> = ref(computed(() => state.system.isCheckoutOpened))
  const hasCartItems: ComputedRef<boolean> = computed(() => !!state.cart.list.length)

  const resumeValue: ComputedRef<number> = computed(() => getters['cart/getCartResume'])
  const movies: ComputedRef<iMovie[]> = computed(() => getters['movie/getMovieList'])
  const total: ComputedRef<number> = computed(() => state.movie.totalResults)
  const query: ComputedRef<number> = computed(() => state.movie.query)
  const toggleLoading: Ref<boolean> = ref(false)

  const page: Ref<number> = ref(1)

  const movieAdd = (movie: iMovie) => {
    toast.success(`Filme ${movie.title} adicionado ao carrinho`)

    dispatch('cart/addToCart', movie)
  }

  const movieRemove = (index: number) => {
    toast.error(`Filme removido do carrinho`)

    dispatch('cart/removeFromCart', index)
  }

  const closeCheckout = () => {
    dispatch('system/setCheckout')
  }

  const openCheckout = () => {
    router.push({ name: 'Checkout' })
  }

  watch(page, (newPage) => {
    dispatch('system/setLoading', true)
    toggleLoading.value = true

    setTimeout(() => {
      dispatch('movie/getMovieList', { page: newPage, query: query.value })
    }, 500)
  })

  watch(movies, () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })

    setTimeout(() => {
      dispatch('system/setLoading', false)
      toggleLoading.value = false
    }, 250)
  })
</script>

<style lang="scss" scoped>
  .home-view {
    padding: 1.25rem 0 3rem;

    &__paginator {
      margin-top: 2rem;
    }

    &__resume {
      align-items: flex-end;
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
    }

    &__value {
      font-size: 1.25rem;
      font-weight: 700;
    }

    &__button-submit {
      margin-top: 1.5rem;
      width: 100%;
    }
  }
</style>
