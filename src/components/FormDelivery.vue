<template>
  <v-form ref="form">
    <h4 class="mb-4">Ваш заказ</h4>
    <div 
      v-for="(product, index) in order"
      :key="product.id"
      class="text-start"
      >
      {{index}}) {{ product.name }}
      <p
        v-for="(variant, index) in product.variants"
        :key="index"
        >
        {{ variant.volume }}мл - {{ variant.price }}p. 
      </p>
    </div>
    <div class="mb-3 mt-3">
        <v-text-field
        v-model="stateForm.city"
        :error-messages="v$.city.$errors.map(e => e.$message)"
        type="input"
        label="Город"
        color="primary"
        variant="outlined"
        clearable
        required
      />
    </div>
    <div class="mb-3">
      <v-text-field
        v-model="stateForm.address"
        clearable
        type="input"
        :error-messages="v$.address.$errors.map(e => e.$message)"
        label="Адрес"
        required
        color="primary"
        variant="outlined"
      />
    </div>
    <v-row class="mb-3">
      <v-col
        class="p-0"
        cols="6">
        <v-text-field
          v-model="stateForm.intercom"
          clearable
          type="input"
          :error-messages="v$.intercom.$errors.map(e => e.$message)"
          label="Домофон"
          required
          color="primary"
          variant="outlined"
        />
      </v-col>
      <v-col
        cols="6">
        <v-text-field
        v-model="stateForm.floor"
        clearable
        type="input"
        :error-messages="v$.floor.$errors.map(e => e.$message)"
        label="Этаж"
        required
        color="primary"
        variant="outlined"
      />
      </v-col>
    </v-row>
    <v-select
      v-model="stateForm.paymentSelected"
      :error-messages="v$.paymentSelected.$errors.map(e => e.$message)"
      label="Способ оплаты"
      :items="paymentTypes"
      item-title="type"
      item-value="value"
      color="primary"
      variant="outlined"
      required
    />

    <button @click.prevent="onSendData">
      Проверка
    </button>
  </v-form>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, onUnmounted } from 'vue'
import { useTelegram } from '@/hooks/useTelegram.js'

import { useVuelidate } from '@vuelidate/core'
import {  required, helpers } from '@vuelidate/validators'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'FormUser',
  setup() {
    const paymentTypes = ref([
      {
        type: 'Наличными курьеру',
        value: 'cash'
      },
      {
        type: 'Картой курьеру',
        value: 'card'
      }
    ])

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

    const { tg } = useTelegram()

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

    tg.onEvent('mainButtonClicked', onSendData)
    let order = ref([])
    onMounted(()=> {
      tg.onEvent('mainButtonClicked', onSendData)
      
      tg.MainButton.setParams({
        text: 'Заказать',
        is_visible: true
      })
      console.log(history.state.order)
      order.value = history.state.order
      tg.onEvent('mainButtonClicked', onSendData)
    })
    
    tg.onEvent('mainButtonClicked', onSendData)
    // отправка данных в телегу
    async function onSendData() {

      const result = await this.v$.$validate()
      if (!result) {
        return
      }
      tg.sendData(JSON.stringify(stateForm))
    }

    onUnmounted(() => {
      tg.offEvent('mainButtonClicked', onSendData)
    })

    return {
      stateForm,
      paymentTypes,
      onSendData,
      order,
      v$
    }
  }
})
</script>

