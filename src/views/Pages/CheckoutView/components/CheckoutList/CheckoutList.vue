<template>
  <div class="checkout-list">
    <div class="checkout-list__item">
      <div class="checkout-list__image">Imagem</div>
      <div class="checkout-list__title">Nome</div>
      <div class="checkout-list__quantity">Qtd</div>
      <div class="checkout-list__price">Preço</div>
      <div class="checkout-list__button" />
    </div>

    <div class="checkout-list__item" v-for="(movie, index) in cart" :key="movie.id">
      <div class="checkout-list__image">
        <img :src="`${imgPath}/w500${movie.poster_path}`" />
      </div>

      <p class="checkout-list__title">{{ movie.title.trim() }}</p>

      <p class="checkout-list__quantity">1</p>

      <p class="checkout-list__price">{{ getMonetary(movie.price) }}</p>

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
    $this: &;

    display: flex;
    flex-direction: column;

    &__item {
      align-items: center;
      display: flex;
      gap: 0.5rem;

      @media #{$md-and-up} {
        gap: 1rem;
      }

      &--title {
        font-size: 1rem;
        font-weight: 700;
      }

      &:first-child {
        margin-bottom: 1rem;

        & > * {
          font-weight: 700;
          text-align: center;
        }
      }

      &:not(:first-child) + #{$this}__item {
        border-top: 1px solid var(--border-color);
        margin-top: 0.25rem;
        padding-top: 0.25rem;
      }
    }

    &__image {
      align-items: center;
      display: flex;
      justify-content: center;
      min-width: 3.5rem;

      img {
        border-radius: 0.125rem;
        aspect-ratio: 3 / 4;
        width: 3rem;
      }
    }

    &__quantity {
      text-align: center;
      min-width: 2rem;
    }

    &__price {
      font-weight: 700;
      letter-spacing: -0.5px;
      min-width: 4.5rem;
      text-align: right;
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
