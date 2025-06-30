<template>
  <div class="checkout-view">
    <div class="container">
      <AppPageTitle title="Finalizar Compra" />

      <div class="checkout-view__container grid">
        <div class="col-12 md:col lg:col">
          <div class="grid">
            <div class="col-12">
              <AppFieldset
                label="Nome Completo"
                v-model="userData.name"
                :error="errors?.name"
                @focus="clearError('name')"
              />
            </div>

            <div class="col-6">
              <AppFieldset
                label="CPF"
                v-model="userData.cpf"
                :error="errors?.cpf"
                mask="###.###.###-##"
                @focus="clearError('cpf')"
              />
            </div>

            <div class="col-6">
              <AppFieldset
                label="Celular"
                v-model="userData.phone"
                :error="errors?.phone"
                mask="(##) #####-####"
                @focus="clearError('phone')"
              />
            </div>

            <div class="col-12">
              <AppFieldset
                label="E-mail"
                v-model="userData.email"
                :error="errors?.email"
                @focus="clearError('email')"
              />
            </div>

            <div class="col-4">
              <AppFieldset
                label="CEP"
                v-model="userData.zipcode"
                :error="errors?.zipcode"
                mask="#####-###"
                @focus="clearError('zipcode')"
              />
            </div>

            <div class="col-8">
              <AppFieldset
                label="Endereço"
                v-model="userData.address"
                :error="errors?.address"
                @focus="clearError('address')"
              />
            </div>

            <div class="col-8">
              <AppFieldset
                label="Cidade"
                v-model="userData.city"
                :error="errors?.city"
                @focus="clearError('city')"
              />
            </div>

            <div class="col-4">
              <AppFieldset
                label="Estado"
                v-model="userData.state"
                :error="errors?.state"
                maxlength="2"
                @focus="clearError('state')"
              />
            </div>
          </div>

          <div v-if="!isHugeScreen" class="checkout-view__action-buttons">
            <AppButton label="Voltar" @click="router.back()" outlined />
            <AppButton label="Finalizar" :disabled="!hasCartItems" @click="handleSubmit" />
          </div>
        </div>

        <div class="col-12 md:col-12 lg:col-1">
          <hr v-if="!isHugeScreen" class="checkout-view__divider" />
        </div>

        <div class="col-12 md:col lg:col">
          <CheckoutList @click-remove="(index: number) => movieRemove(index)" />

          <div v-if="hasCartItems" class="checkout-view__resume">
            <span>Total:</span>
            <span class="checkout-view__value">{{ getMonetary(resumeValue) }}</span>
          </div>

          <div v-if="isHugeScreen" class="checkout-view__action-buttons">
            <AppButton label="Voltar" @click="router.back()" outlined />
            <AppButton label="Finalizar" :disabled="!hasCartItems" @click="handleSubmit" />
          </div>
        </div>
      </div>
    </div>

    <AppModal v-if="isModalOpened">
      <template #title> Obrigado {{ userName }} </template>

      <p class="text-center">Sua compra foi finalizada com sucesso!</p>

      <template #footer>
        <AppButton label="Ir para loja" @click="handleClickClose" />
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
  import { computed, type ComputedRef, ref, type Ref, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { AppFieldset, AppModal, AppPageTitle, AppButton } from '@/components'
  import { CheckoutList } from './components'
  import {
    useToast,
    useNumberHandler,
    useValidators,
    useDialog,
    useDeviceSize
  } from '@/providers/composables'

  defineOptions({
    name: 'CheckoutView'
  })

  interface iCheckout {
    name: string
    cpf: string
    email: string
    phone: string
    zipcode: string
    address: string
    city: string
    state: string
  }

  const {
    validateEmpty,
    validateLength,
    validateEmail,
    validateFullName,
    validateCpf,
    validatePhone
  } = useValidators()

  const { getters, state: storeState, dispatch } = useStore()
  const { toast } = useToast()
  const { getMonetary } = useNumberHandler()
  const { isOpen: isModalOpened, openDialog: openModal, closeDialog: closeModal } = useDialog()
  const { isMobile, isTablet } = useDeviceSize()

  const router = useRouter()

  const isHugeScreen = computed(() => !isMobile.value && !isTablet.value)
  const hasCartItems: ComputedRef<boolean> = computed(() => !!storeState.cart.list.length)
  const resumeValue: ComputedRef<number> = computed(() => getters['cart/getCartResume'])
  const userName: ComputedRef<string> = computed(() => storeState.user.name)

  const userData: Ref<iCheckout> = ref({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    zipcode: '',
    address: '',
    city: '',
    state: ''
  })

  type errorType = Record<keyof iCheckout, string>
  const errors: Ref<errorType> = ref({} as iCheckout)

  const resetErrors = () => {
    errors.value = {
      name: '',
      cpf: '',
      phone: '',
      email: '',
      zipcode: '',
      address: '',
      city: '',
      state: ''
    }
  }

  onMounted(() => {
    dispatch('system/setCheckout')
  })

  const movieRemove = (index: number) => {
    toast.error(`Filme removido do carrinho`)

    dispatch('cart/removeFromCart', index)
  }

  const handleSubmit = async () => {
    resetErrors()

    if (await validateForm()) {
      openModal()
    }
  }

  const handleClickClose = () => {
    closeModal()
    dispatch('cart/clearCart')

    router.push('/')
  }

  const clearError = (field: keyof iCheckout) => ((errors.value as iCheckout)[field] = '')

  const validateForm = () => {
    if (!validateEmpty(userData.value.name)) {
      errors.value.name = 'Campo obrigatório.'
    } else if (!validateFullName(userData.value.name)) {
      errors.value.name = 'Insira seu nome completo.'
    }

    if (!validateEmpty(userData.value.cpf)) {
      errors.value.cpf = 'Campo obrigatório.'
    } else if (userData.value.cpf && !validateCpf(userData.value.cpf)) {
      errors.value.cpf = 'O CPF deve ter 11 dígitos.'
    }
    if (!validateEmpty(userData.value.phone)) {
      errors.value.phone = 'Campo obrigatório.'
    } else if (!validatePhone(userData.value.phone)) {
      errors.value.phone = 'Telefone/Celular inválido. Preencha com DDD.'
    }
    if (!validateEmpty(userData.value.email)) {
      errors.value.email = 'Campo obrigatório.'
    } else if (!validateEmail(userData.value.email)) {
      errors.value.email = 'O e-mail informado é inválido.'
    }
    if (!validateEmpty(userData.value.zipcode)) {
      errors.value.zipcode = 'Campo obrigatório.'
    } else if (!validateLength(userData.value.zipcode, 8, 8)) {
      errors.value.zipcode = 'O e-mail informado é inválido.'
    }
    if (!validateEmpty(userData.value.address)) {
      errors.value.address = 'Campo obrigatório.'
    }
    if (!validateEmpty(userData.value.city)) {
      errors.value.city = 'Campo obrigatório.'
    }
    if (!validateEmpty(userData.value.state)) {
      errors.value.state = 'Campo obrigatório.'
    }

    return !!Object.values(errors.value).filter((error: any) => !error).length
  }
</script>

<style lang="scss" scoped>
  .checkout-view {
    padding: 1.25rem 0 3rem;

    &__container {
      flex-direction: column-reverse;

      @media #{$lg-and-up} {
        flex-direction: row;
      }
    }

    &__divider {
      border: 1px solid var(--border-color);
      margin: 0.5rem 0;
    }

    &__resume {
      align-items: flex-end;
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;

      @media #{$md-and-up} {
        margin-top: 2rem;
      }
    }

    &__value {
      font-size: 1.25rem;
      font-weight: 700;
    }

    &__action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      margin-top: 1.5rem;

      @media #{$md-and-up} {
        margin-top: 2.5rem;
      }
    }
  }
</style>
