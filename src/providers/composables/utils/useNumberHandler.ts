export function useNumberHandler() {
  const getMonetary = (
    value: number = 0,
    lang: string = 'pt-BR',
    currency: string = 'BRL'
  ): string => {
    return Intl.NumberFormat(lang, { style: 'currency', currency }).format(value)
  }

  return {
    getMonetary
  }
}
