<template>
  <div class="the-loader" :class="componentClass">
    <img class="the-loader__logo" :src="logoLoaderImg" />
    <div class="the-loader__circle" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch, type Ref } from 'vue'
  import logoLoaderImg from '@/assets/logo-loader.png'

  defineOptions({
    name: 'TheLoader'
  })

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  const initial: Ref<boolean> = ref(true)
  const transition: Ref<boolean> = ref(false)
  const hide: Ref<boolean> = ref(false)

  const componentClass = computed(() => [
    initialClass.value,
    transitionClass.value,
    hideClass.value
  ])
  const initialClass = computed(() => (initial.value ? 'the-loader--initial' : ''))
  const transitionClass = computed(() => (transition.value ? 'the-loader--transition' : ''))
  const hideClass = computed(() => (hide.value ? 'the-loader--hide' : ''))

  const hideLoader = () => {
    if (initial.value) {
      initial.value = false
    }

    setTimeout(() => {
      transition.value = true

      setTimeout(() => {
        hide.value = true
      }, 250)
    })
  }

  const showLoader = () => {
    setTimeout(() => {
      hide.value = false

      setTimeout(() => {
        transition.value = false
      }, 250)
    })
  }

  watch(
    () => props.show,
    (val) => {
      if (val) {
        showLoader()
      } else {
        hideLoader()
      }
    },
    { immediate: true }
  )
</script>

<style lang="scss" scoped>
  .the-loader {
    $this: &;

    align-items: center;
    background-color: var(--loader-background);
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    opacity: 0.95;
    position: fixed;
    top: 0;
    transition: opacity 0.25s ease-in;
    width: 100vw;
    z-index: 20000;

    &__logo {
      position: absolute;
      width: 75px;
    }

    &__circle {
      z-index: -1;
      font-size: 100px;
      color: var(--loader-circle-background);
      width: 1em;
      height: 1em;
      box-sizing: border-box;
      background-color: currentcolor;
      position: relative;
      border-radius: 50%;

      &::after,
      &::before {
        content: '';
        display: block;
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        border-radius: inherit;
        animation: flowerFlow 1s ease-out infinite;
      }

      &::after {
        animation-delay: 0.4s;
      }
    }

    &#{$this} {
      &--initial {
        opacity: 1;
      }

      &--transition {
        opacity: 0;
      }

      &--hide {
        display: none;
      }
    }
  }

  @keyframes flowerFlow {
    0% {
      opacity: 1;
      transform: rotate(0deg);
      box-shadow:
        0 0 0 -0.5em var(--primary-color),
        0 0 0 -0.5em var(--primary-color),
        0 0 0 -0.5em var(--primary-color),
        0 0 0 -0.5em var(--primary-color),
        0 0 0 -0.5em var(--primary-color),
        0 0 0 -0.5em var(--primary-color),
        0 0 0 -0.5em var(--primary-color),
        0 0 0 -0.5em var(--primary-color);
    }

    100% {
      opacity: 0;
      transform: rotate(180deg);
      box-shadow:
        -1em -1em 0 -0.35em var(--primary-color),
        0 -1.5em 0 -0.35em var(--primary-color),
        1em -1em 0 -0.35em var(--primary-color),
        -1.5em 0 0 -0.35em var(--primary-color),
        1.5em -0 0 -0.35em var(--primary-color),
        -1em 1em 0 -0.35em var(--primary-color),
        0 1.5em 0 -0.35em var(--primary-color),
        1em 1em 0 -0.35em var(--primary-color);
    }
  }
</style>
