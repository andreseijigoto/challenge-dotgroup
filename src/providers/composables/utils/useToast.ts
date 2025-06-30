import Toastify from 'toastify-js'

export function useToast() {
  const config = {
    duration: 2000,
    gravity: 'top' as const,
    position: 'center' as const
  }

  return {
    toast: {
      success: (text: string) =>
        Toastify({
          ...config,
          text,
          style: {
            background: 'linear-gradient(to right, #0f766e, #15803d)'
          }
        }).showToast(),
      error: (text: string) =>
        Toastify({
          ...config,
          text,
          style: {
            background: 'linear-gradient(to right, #ef4444, #b91c1c)'
          }
        }).showToast()
    }
  }
}
