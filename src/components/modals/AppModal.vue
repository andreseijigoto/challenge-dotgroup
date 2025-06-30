<template>
  <div class="app-modal" :class="componentClass">
    <div class="app-modal__container">
      <div class="app-modal__header">
        <h1 class="app-modal__title">
          <slot name="title" />
        </h1>
      </div>

      <div class="app-modal__content">
        <slot />
      </div>

      <div v-if="$slots.footer" class="app-modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, type Ref } from 'vue'

  defineOptions({
    name: 'AppModal'
  })

  const open: Ref<boolean> = ref(false)
  const transition: Ref<boolean> = ref(false)

  const componentClass = computed(() => [openClass.value, transitionClass.value])
  const openClass = computed(() => (open.value ? 'app-modal--is-opened' : ''))
  const transitionClass = computed(() => (transition.value ? 'app-modal--transition' : ''))

  onMounted(() => {
    open.value = true

    setTimeout(() => {
      transition.value = true
    })
  })
</script>

<style lang="scss" scoped>
  .app-modal {
    $this: &;

    align-items: center;
    background-color: var(--modal-overlay-background);
    display: none;
    height: 100%;
    justify-content: center;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: opacity 0.25s ease-in 0.25s;
    width: 100%;
    z-index: 1000;

    &--is-opened {
      display: flex;
    }

    &--transition {
      opacity: 1;

      #{$this}__container {
        margin-right: 0;
      }
    }

    &__container {
      background-color: #fff;
      border-radius: 0.5rem;
      box-shadow: var(--modal-shadow);
      display: flex;
      flex-direction: column;
      max-height: calc(100% - 4rem);
      max-width: 400px;
      overflow: hidden;
      width: calc(100% - 4rem);
    }

    &__header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: 1rem;
    }

    &__title {
      font-size: 1.25rem;
      font-weight: 600;
      text-align: center;
      flex-grow: 1;
    }

    &__content {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      min-height: 50px;
      overflow-y: auto;
      padding: 0 1rem;
    }

    &__footer {
      align-items: center;
      display: flex;
      justify-content: center;
      padding: 1rem;
    }
  }
</style>
