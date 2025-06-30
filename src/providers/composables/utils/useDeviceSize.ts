import { ref, type Ref } from 'vue'

const deviceSize: Ref<number> = ref(0)
const isMobile: Ref<boolean> = ref(false)
const isTablet: Ref<boolean> = ref(false)
const isDesktop: Ref<boolean> = ref(false)
const isHighDefinition: Ref<boolean> = ref(false)

export function useDeviceSize() {
  const setDeviceSize = (width: number) => {
    deviceSize.value = width
    isMobile.value = width < 700
    isTablet.value = width >= 700 && width < 960
    isDesktop.value = width >= 960 && width < 1200
    isHighDefinition.value = width >= 1200
  }

  return {
    deviceSize,
    isMobile,
    isTablet,
    isDesktop,
    isHighDefinition,
    setDeviceSize
  }
}
