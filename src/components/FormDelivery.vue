<template>
  <v-form ref="form">
    <div class="mb-3 mt-2">
      <v-text-field
        v-model="stateForm.city"
        :error-messages="stateError.city"
        :disabled="!order.length"
        :color="'var(--tg-theme-button-color)'"
        type="input"
        label="Город"
        variant="outlined"
        clearable
        required
        density="compact"
      />
    </div>
    <div class="mb-3">
      <v-text-field
        v-model="stateForm.address"
        :error-messages="stateError.address"
        :disabled="!order.length"
        :color="'var(--tg-theme-button-color)'"
        clearable
        type="input"
        label="Адрес"
        required
        variant="outlined"
        density="compact"
      />
    </div>
    <v-row class="mb-3">
      <v-col
        class="p-0"
        cols="6">
        <v-text-field
          v-model="stateForm.intercom"
          :error-messages="stateError.intercom"
          :disabled="!order.length"
           :color="'var(--tg-theme-button-color)'"
          clearable
          type="input"
          label="Домофон"
          required
          variant="outlined"
          density="compact"
        />
      </v-col>
      <v-col
        cols="6">
        <v-text-field
          v-model="stateForm.floor"
          :error-messages="stateError.floor"
          :disabled="!order.length"
          :color="'var(--tg-theme-button-color)'"
          clearable
          type="input"
          label="Этаж"
          required
          variant="outlined"
          density="compact"
        />
      </v-col>
    </v-row>
    <v-select
      v-model="stateForm.paymentSelected"
      :error-messages="stateError.paymentSelected"
      :items="paymentType"
      :disabled="!order.length"
      :color="'var(--tg-theme-button-color)'"
      label="Способ оплаты"
      item-title="type"
      item-value="value"
      variant="outlined"
      density="compact"
      required
    />
  </v-form>
</template>

<script>
import {defineComponent, onMounted, reactive, toRefs, onUnmounted} from "vue";
import { useTelegram } from '@/hooks/useTelegram'
export default defineComponent({
  name: "FormDelivery",
  props: {
    paymentType: {
      type: Array,
      default: () => []
    },
    order: {
      type:  Array,
      default: () => []
    },
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const initialStateFrom = {
      city: '',
      address: '',
      intercom: '',
      floor: '',
      paymentSelected: ''
    }
    const initialStateError = {
      city: [],
      address: [],
      intercom: [],
      floor: [],
      paymentSelected: []
    }

    let stateError = reactive({
      ...initialStateError
    })
    const stateForm = reactive({
      ...initialStateFrom,
    })
  
    const { tg, queryId }  = useTelegram()
    const { 
      order,
      totalPrice } = toRefs(props)
    onMounted(() => {
      tg.onEvent('mainButtonClicked', sendOrder)
      tg.MainButton.setParams({
        text: 'Заказать',
        is_visible: true
      })
    })

    const checkValidForm = () => {
      let errors = false
      for (let key in stateError) {
        stateError[key] = []
        if (!stateForm[key]) {
          stateError[key].push('Необходимо заполнить поле')
          errors = true
        }
      }
      return errors
    }
    function sendOrder() {

      const errors = checkValidForm()
      if (errors) {
        return
      }

      const data = {
        userInfo: stateForm,
        order: order.value,
        price: totalPrice.value,
        queryId: queryId
      }
      fetch('https://33f3-31-47-167-86.eu.ngrok.io/web-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }

    onUnmounted(() => {
      tg.offEvent('mainButtonClicked', sendOrder)
      tg.MainButton.hide()
    })

    return {
      stateForm,
      sendOrder,
      stateError
    }
  }
})
</script>


