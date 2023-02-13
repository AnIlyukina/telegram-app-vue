<template>
  <v-form ref="form">
    <h4 class="mb-4">Ваш заказ</h4>
    <div
      v-for="(product, index) in order"
      :key="product.id"
      class="text-start mb-3"
      >
        {{index + 1}}) {{ product.name }} {{ product.volume }}мл.
      <v-btn
        size="x-small"
        color="blue-grey"
        class="ml-4"
        @click="decrementCount(index)"
      >
        -
      </v-btn>
        {{ product.count }} шт
      <v-btn
        size="x-small"
        color="blue-grey"
        class="mr-2"
        @click="incrementCount(index)"
      >
        +
      </v-btn>
        - {{ product.count * product.price }}р.
      <p
        v-for="(variant, index) in product.variants"
        :key="index"
        >
        {{ variant.volume }}мл - {{ variant.price }}p.
      </p>
    </div>
    <v-divider></v-divider>
    <p class="mt-1">Итого: {{ totalPrice }} p.</p>
    <div class="mb-3 mt-2">
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
import {defineComponent, ref, reactive, onMounted, onUnmounted, computed} from 'vue'
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

    let order = ref([])

    // отправка данных в телегу
    async function onSendData() {
      const result = await this.v$.$validate()
      if (!result) {
        return
      }
      let data = {...stateForm}
      data.order = order.value
      data.price = totalPrice.value
      console.log(data, 'отправил')
      tg.sendData(JSON.stringify(data))
    }


    onMounted(()=> {
      tg.onEvent('mainButtonClicked', onSendData)
      tg.MainButton.setParams({
        text: 'Заказать',
        is_visible: true
      })
      order.value = history.state.order
    })

    const decrementCount = (index) => {
      if (order.value[index].count < 2) {
        return
      }
      order.value[index].count -= 1
    }

    const incrementCount = (index) => {
      order.value[index].count += 1
    }

    let totalPrice = computed(() => {
      return order.value.reduce((acc, item) => {
        return acc += (item.price * item.count)
      }, 0)
    })

    onUnmounted(() => {
      tg.offEvent('mainButtonClicked', onSendData)
    })

    return {
      stateForm,
      paymentTypes,
      onSendData,
      order,
      v$,
      decrementCount,
      incrementCount,
      totalPrice
    }
  }
})
</script>

