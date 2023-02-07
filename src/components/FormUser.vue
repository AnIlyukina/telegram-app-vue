<template>
  <v-form ref="form">
    <h3 class="mb-4">Введите ваши данные</h3>
      <v-text-field
        v-model="stateForm.city"
        :error-messages="v$.city.$errors.map(e => e.$message)"
        label="Город"
        required
      />
      <v-text-field
        v-model="stateForm.address"
        :error-messages="v$.address.$errors.map(e => e.$message)"
        label="Адрес"
        required
      />
      <v-row>
        <v-col
          cols="6">
          <v-text-field
            v-model="stateForm.intercom"
            :error-messages="v$.intercom.$errors.map(e => e.$message)"
            label="Домофон"
            required
          />
        </v-col>
        <v-col
          cols="6">
          <v-text-field
          v-model="stateForm.floor"
          :error-messages="v$.floor.$errors.map(e => e.$message)"
          label="Этаж"
          required
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
        required
      />
  </v-form>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, onUnmounted } from 'vue'
import { useTelegram } from '@/hooks/useTelegram.js'

import { useVuelidate } from '@vuelidate/core'
import {  required } from '@vuelidate/validators'

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
      city: { required },
      address: { required },
      intercom: { required },
      floor: { required },
      paymentSelected: { required },
    }

    const v$ = useVuelidate(rules, stateForm)


    onMounted(()=> {
      tg.MainButton.setParams({
        text: 'Отправить данные',
        is_visible: true
      })

      tg.onEvent('mainButtonClicked', onSendData)
    })

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
      v$
    }
  }
})
</script>

