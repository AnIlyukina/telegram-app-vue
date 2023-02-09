<template>
  <v-form ref="form">
    <h3 class="mb-4">Введите ваши данные</h3>
    <div class="mb-3">
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


    onMounted(()=> {
      console.log('onMounted')
      tg.MainButton.setParams({
        text: 'Отправить данные',
        is_visible: true
      })
    })


     tg.onEvent('mainButtonClicked', async function onSendData() {

      const result = await this.v$.$validate()
      if (!result) {
        return
      }
      tg.sendData(JSON.stringify(stateForm))
    })
    // отправка данных в телегу
    async function onSendData() {

      const result = await this.v$.$validate()
      if (!result) {
        return
      }
      tg.sendData(JSON.stringify(stateForm))
    }



    // onUnmounted(() => {
    //   console.log('onUnmounted')
    //   tg.offEvent('mainButtonClicked', onSendData)
    // })

    return {
      stateForm,
      paymentTypes,
      onSendData,
      v$
    }
  }
})
</script>

