<template>
  <nav class="the-menubar" :class="{ 'the-menubar--slim': isMenubarSlim }">
    <div class="the-menubar__container container">
      <div class="the-menubar__start">
        <router-link to="/">
          <img class="the-menubar__logo" src="@/assets/logo.png" alt="logo" />
        </router-link>
      </div>
      <div v-if="!isMobile" class="the-menubar__center">
        <div class="the-menubar__search">
          <AppFieldset class="the-menubar__input-search" v-model="search" placeholder="Pesquisar" />
          <AppButton
            v-if="search"
            class="the-menubar__button-clear"
            icon="close"
            @click="() => (search = '')"
            text
          />
        </div>
      </div>
      <div class="the-menubar__end">
        <AppButton icon="heart" @click="clickFavorites" :disabled="disableFavorites" />
        <AppButton icon="cart" @click="clickCheckout" :disabled="disableCheckout" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { ref, watch, type Ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { AppButton, AppFieldset } from '@/components'
  import { useDeviceSize, useDeviceScroll } from '@/providers/composables'

  defineProps({
    disableFavorites: {
      type: Boolean,
      default: false
    },
    disableCheckout: {
      type: Boolean,
      default: false
    }
  })

  const { isMenubarSlim } = useDeviceScroll()
  const { isMobile } = useDeviceSize()

  const search = ref('')
  const searchTimeout: Ref<number> = ref(0)

  const emit = defineEmits(['openFavorites', 'openCheckout', 'search'])

  const clickFavorites = () => {
    emit('openFavorites')
  }

  const clickCheckout = () => {
    emit('openCheckout')
  }

  watch(
    search,
    (value) => {
      if (!value.trim() || value.trim().length > 3) {
        clearInterval(searchTimeout?.value)

        searchTimeout.value = setTimeout(() => {
          emit('search', value)
        }, 500)
      }
    },
    {
      immediate: true
    }
  )
</script>

<style lang="scss" scoped>
  .the-menubar {
    $this: &;
    align-items: center;
    backdrop-filter: blur(10px);
    background-color: var(--menubar-background-color);
    color: var(--button-color-text);
    display: flex;
    height: var(--menubar-mobile-height);
    justify-content: space-between;
    padding: 0.5rem 0;
    transition: all 0.25s ease-in-out;
    z-index: 1000;

    @media #{$md-and-up} {
      height: var(--menubar-tablet-height);
    }

    @media #{$lg-and-up} {
      height: var(--menubar-desktop-height);
    }

    &#{$this}--slim {
      background-color: rgba(255, 255, 255, 0.75);
      height: var(--menubar-slim-height);

      #{$this}__logo {
        height: calc(var(--menubar-slim-height) * 0.625);
      }
    }

    &__container {
      align-items: center;
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    &__start {
      align-items: center;
      display: flex;
      flex-basis: 0;
      flex-grow: 1;
      gap: 1rem;
    }

    &__center {
      flex-grow: 2;
      justify-content: center;
      max-width: 50%;
    }

    &__end {
      align-items: center;
      display: flex;
      flex-basis: 0;
      flex-grow: 1;
      gap: 1rem;
      justify-content: flex-end;
    }

    &__logo {
      border-radius: 0.25rem;
      height: var(--menubar-logo-height);
      transition: all 0.25s ease-in-out;

      @media #{$md-and-up} {
        height: var(--menubar-logo-height-tablet);
      }
    }

    &__search {
      position: relative;
    }

    &__input-search {
      flex-grow: 1;
    }

    &__button-clear {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
</style>
