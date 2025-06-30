export function useValidators() {
  const validateEmpty = (param: string) => {
    return !!param && param.trim().length
  }

  const validateLength = (param: string, min = 0, max = 0) => {
    const len = param?.trim.length || 0

    return !param || !len || (len >= min && len <= max)
  }

  const validateEmail = (param: string) => {
    return !!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(param)
  }

  const validateFullName = (param: string) => {
    return param?.split(' ')?.filter((p) => p && p.length > 2)?.length > 1
  }

  const validateCpf = (param: string) => {
    // missing deep cpf validation
    return !!/^\d{11}$/.test(param.trim().replace(/\D/g, ''))
  }

  const validateCnpj = (param: string) => {
    // missing deep cnpj validation
    return !!/^\d{14}$/.test(param)
  }

  const validatePhone = (param: string) => {
    return !!/^\d{10,11}$/.test(param.trim().replace(/\D/g, ''))
  }

  return {
    validateEmpty,
    validateLength,
    validateEmail,
    validateFullName,
    validateCpf,
    validateCnpj,
    validatePhone
  }
}
