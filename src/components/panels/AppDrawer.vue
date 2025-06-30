<template>
  <div class="app-drawer" :class="componentClass">
    <div class="app-drawer__container">
      <div class="app-drawer__header">
        <div class="app-drawer__title">{{ title }}</div>
        <AppButton icon="close" @click="closeDrawer" transparent />
      </div>

      <div class="app-drawer__content">
        <slot />
      </div>

      <div class="app-drawer__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, type Ref } from 'vue'
  import { AppButton } from '@/components'

  defineOptions({
    name: 'AppDrawer'
  })

  const emit = defineEmits(['close'])

  defineProps({
    title: {
      type: String,
      required: true
    }
  })

  const open: Ref<boolean> = ref(false)
  const transition: Ref<boolean> = ref(false)

  const componentClass = computed(() => [openClass.value, transitionClass.value])
  const openClass = computed(() => (open.value ? 'app-drawer--is-opened' : ''))
  const transitionClass = computed(() => (transition.value ? 'app-drawer--transition' : ''))

  const closeDrawer = () => {
    transition.value = false

    setTimeout(() => {
      emit('close')
    }, 500)
  }

  onMounted(() => {
    open.value = true

    setTimeout(() => {
      transition.value = true
    })
  })
</script>

<style lang="scss" scoped>
  .app-drawer {
    $this: &;

    background-color: var(--drawer-overlay-background);
    display: none;
    height: 100%;
    justify-content: flex-end;
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
      box-shadow: var(--drawer-shadow);
      background-color: var(--drawer-background-color);
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      margin-right: -340px;
      position: relative;
      transition: margin-right 0.25s ease-in 0.25s;
      width: 320px;
    }

    &__header {
      align-items: center;
      box-shadow: 0 0 10px 10px rgba(255, 255, 255, 1);
      display: flex;
      justify-content: space-between;
      padding: 1rem 1rem 0;
      z-index: 1;
    }

    &__content {
      flex-grow: 1;
      overflow-y: auto;
      padding: 1.5rem 1rem;
    }

    &__footer {
      box-shadow: 0 0 10px 10px rgba(255, 255, 255, 1);
      padding: 0 1rem 1rem;
      z-index: 1;
    }
  }
</style>
