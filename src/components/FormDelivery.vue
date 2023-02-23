<template>
  <v-form ref="form">
    <div class="mb-3 mt-2">
      <v-text-field
        v-model="stateForm.city"
        :error-messages="v$.city.$errors.map(e => e.$message)"
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
        :error-messages="v$.address.$errors.map(e => e.$message)"
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
          :error-messages="v$.intercom.$errors.map(e => e.$message)"
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
          :error-messages="v$.floor.$errors.map(e => e.$message)"
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
      :error-messages="v$.paymentSelected.$errors.map(e => e.$message)"
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
    <button
      @click.prevent="sendOrder"
    >
      Проверка связи
    </button>
  </v-form>
</template>

<script>
import {defineComponent, onMounted, reactive, toRefs, onUnmounted} from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
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

    const stateForm = reactive({
      ...initialStateFrom,
    })

    const rules = {
      city: {
        required: helpers.withMessage('Обязательное поле', required)
      },
      address: { required: helpers.withMessage('Обязательное поле', required) },
      intercom: { required: helpers.withMessage('Обязательное поле', required) },
      floor: { required: helpers.withMessage('Обязательное поле', required) },
      paymentSelected: { required: helpers.withMessage('Обязательное поле', required) },
    }

    const v$ = useVuelidate(rules, stateForm)
    const { tg, queryId }  = useTelegram()
    const { 
      // order,
      totalPrice } = toRefs(props)
    
    onMounted(() => {
      tg.onEvent('mainButtonClicked', sendOrder)
      tg.MainButton.setParams({
        text: 'Заказать',
        is_visible: true
      })
    })
    async function sendOrder() {
      const result = await this.v$.$validate()
      if (!result) {
        return
      }
      const data = {
        userInfo: stateForm,
        price: totalPrice.value,
        queryId: queryId
      }
      console.log(JSON.stringify(data), queryId)
      fetch('https://7393-185-37-59-81.eu.ngrok.io/web-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }

    onUnmounted(() => {
      console.log('onUnmounted')
      tg.offEvent('mainButtonClicked', sendOrder)
      tg.MainButton.hide()
    })

    return {
      stateForm,
      v$,
      sendOrder
    }
  }
})
</script>


