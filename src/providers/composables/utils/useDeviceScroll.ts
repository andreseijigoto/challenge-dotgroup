import { ref, type Ref } from 'vue'

const isMenubarSlim: Ref<boolean> = ref(false)

export function useDeviceScroll() {
  const setDeviceScroll = (top: number) => {
    isMenubarSlim.value = top > 200
  }

  return {
    isMenubarSlim,
    setDeviceScroll
  }
}
