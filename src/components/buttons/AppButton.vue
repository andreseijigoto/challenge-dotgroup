<template>
  <button class="app-button" :class="buttonClass" @click="onClick">
    <AppIcon v-if="icon" class="app-button__icon" :icon="icon" />

    <div v-if="label" class="app-button__label">
      {{ label }}
    </div>
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { AppIcon } from '@/components'

  defineOptions({
    name: 'AppButton'
  })

  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    outlined: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['click'])

  const iconClass = computed(() => (props.icon && !props.label ? 'app-button--icon' : ''))
  const outlineClass = computed(() => (props.outlined ? 'app-button--outlined' : ''))
  const roundedClass = computed(() => (props.rounded ? 'app-button--rounded' : ''))
  const transparentClass = computed(() => (props.transparent ? 'app-button--transparent' : ''))
  const textClass = computed(() => (props.text ? 'app-button--text' : ''))
  const colorClass = computed(() => (props.color ? `app-button--${props.color}` : ''))

  const buttonClass = computed(() => [
    iconClass.value,
    outlineClass.value,
    roundedClass.value,
    transparentClass.value,
    colorClass.value,
    textClass.value
  ])

  const onClick = (event: MouseEvent) => {
    emit('click', event)
  }
</script>

<style lang="scss" scoped>
  .app-button {
    $this: &;

    align-items: center;
    background-color: var(--primary-color);
    border: var(--button-border);
    border-radius: 0.25rem;
    color: var(--button-color-text);
    cursor: pointer;
    display: flex;
    font-size: 1rem;
    gap: 0.5rem;
    height: var(--button-height);
    justify-content: center;
    padding: 0 0.75rem;
    transition: all 0.3s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover {
      background-color: var(--primary-color-darker);
    }

    &__label {
      font-size: var(--button-label-size);
    }

    &__icon {
      font-size: var(--button-icon-size);
    }

    &#{$this} {
      &--icon {
        padding: 0;
        width: var(--button-height);

        #{$this}__icon {
          font-size: var(--icon-size);
        }
      }

      &--rounded {
        border-radius: 2rem;
      }

      &--transparent {
        background-color: transparent;
        border: none;
        color: var(--primary-color);
      }

      &--outlined {
        background-color: #fff;
        border: 1px solid var(--primary-color);
        color: var(--primary-color);

        &:hover {
          background-color: var(--primary-color);
          color: #fff;
        }
      }

      &--text {
        background-color: transparent;
        border: none;
        color: var(--primary-color);

        &:hover {
          background-color: rgba(from var(--primary-color) r g b / 0.2);
        }
      }

      &--white {
        color: #fff;
      }

      &--red {
        color: #be123c;
      }
    }
  }
</style>
