import { ref, type Ref } from 'vue'

export function useDialog() {
  const isOpen: Ref<boolean> = ref(false)
  const openDialog = () => (isOpen.value = true)
  const closeDialog = () => (isOpen.value = false)

  return { isOpen, openDialog, closeDialog }
}
