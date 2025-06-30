<template>
  <div class="checkout-list">
    <div class="checkout-list__item" v-for="(movie, index) in cart" :key="movie.id">
      <div
        class="checkout-list__image"
        :style="{ backgroundImage: `url(${imgPath}/w500${movie.poster_path})` }"
      />
      <div class="checkout-list__title">{{ movie.title.trim() }}</div>
      <div class="checkout-list__quantity">1</div>
      <div class="checkout-list__price">{{ getMonetary(movie.price) }}</div>

      <AppButton
        class="checkout-list__button"
        icon="trash-can"
        transparent
        @click="handleClickRemove(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, type ComputedRef } from 'vue'
  import { useStore } from 'vuex'
  import { useNumberHandler } from '@/providers/composables'
  import { AppButton } from '@/components'
  import type { iMovie } from '@/providers/services'

  defineOptions({
    name: 'AppCheckoutList'
  })

  const imgPath = inject('imgPath')

  const emit = defineEmits(['clickRemove'])

  const { getMonetary } = useNumberHandler()
  const { state } = useStore()

  const cart: ComputedRef<iMovie[]> = computed(() => state.cart.list)

  const handleClickRemove = (index: number) => {
    emit('clickRemove', index)
  }
</script>

<style lang="scss" scoped>
  .checkout-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__item {
      align-items: center;
      display: flex;
      gap: 0.5rem;
    }

    &__image {
      aspect-ratio: 3 / 4;
      height: 3rem;
      background-color: #dddddd;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 0.125rem;
    }

    &__quantity {
      text-align: center;
      min-width: 1rem;
    }

    &__price {
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    &__title {
      flex-grow: 1;
      display: -webkit-box;
      font-weight: 700;
      letter-spacing: -0.5px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    &__button {
      min-width: 2.5rem;
      height: 2.5rem;
    }
  }
</style>
