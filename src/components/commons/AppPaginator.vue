<template>
  <div class="app-paginator">
    <vue-awesome-paginate
      :total-items="total"
      :items-per-page="perPage"
      :max-pages-shown="maxPagesShown"
      :show-breakpoint-buttons="showBreakpointButtons"
      :show-jump-buttons="showJumpButtons"
      v-model="currentPage"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, type WritableComputedRef } from 'vue'

  defineOptions({
    name: 'AppPaginator'
  })

  const props = defineProps({
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 10
    },
    maxPagesShown: {
      type: Number,
      default: 5
    },
    modelValue: {
      type: Number,
      default: 1
    },
    showBreakpointButtons: {
      type: Boolean,
      default: true
    },
    showJumpButtons: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const currentPage: WritableComputedRef<number> = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
</script>

<style lang="scss" scoped>
  .app-paginator {
    display: flex;
    justify-content: center;
    align-items: center;

    &:deep(.pagination-container) {
      gap: var(--paginator-gap);

      .paginate-buttons {
        height: 2rem;
        min-width: 2rem;
        cursor: pointer;
        background-color: var(--parginator-background);
        border: var(--paginator-border);
        color: var(--paginator-color);
        padding: var(--paginator-padding);

        &:hover {
          background-color: rgba(from var(--primary-color) r g b / 0.2);
        }

        &.active-page {
          background-color: var(--primary-color);
          border: var(--primary-color);
          color: var(--button-color-text);
        }
      }
    }
  }
</style>
