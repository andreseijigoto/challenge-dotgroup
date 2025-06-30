<template>
  <div class="app-overlay">
    <div v-if="show" class="app-overlay__loading" data-test="show">
      <slot name="overlay" />
    </div>

    <div v-if="$slots?.default" class="app-overlay__content h-full w-full" data-test="slot">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'AppOverlay'
  })

  defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="scss" scoped>
  .app-overlay {
    align-items: center;
    border-radius: 0.625rem;
    display: flex;
    height: 100%;
    overflow: hidden;
    padding: 0.5rem;
    position: relative;
    width: 100%;

    &__loading {
      align-items: center;
      backdrop-filter: blur(2px);
      background-color: var(--loader-background) !important;
      display: flex;
      flex-direction: column;
      height: 100%;
      inset: 0px;
      justify-content: center;
      left: 0;
      opacity: 1;
      padding-bottom: 0.15rem;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 100;
    }
  }
</style>
