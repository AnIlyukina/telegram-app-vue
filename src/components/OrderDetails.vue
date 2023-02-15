<template>
  <v-container>
    <slot/>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OrderDetails',

  setup() {

    // const { tg } = useTelegram()
    //
    //
    // let order = ref([])
    //
    // // отправка данных в телегу
    // async function onSendData() {
    //   const result = await this.v$.$validate()
    //   if (!result) {
    //     return
    //   }
    //   let data = {...stateForm}
    //   data.order = order.value
    //   data.price = totalPrice.value
    //   console.log(data, 'отправил')
    //   tg.sendData(JSON.stringify(data))
    // }
    //
    //
    // onMounted(()=> {
    //   tg.onEvent('mainButtonClicked', onSendData)
    //   tg.MainButton.setParams({
    //     text: 'Заказать',
    //     is_visible: true
    //   })
    //   order.value = history.state.order
    // })
    //
    //
    // let totalPrice = computed(() => {
    //   return order.value.reduce((acc, item) => {
    //     return acc += (item.price * item.count)
    //   }, 0)
    // })
    //
    // onUnmounted(() => {
    //   tg.offEvent('mainButtonClicked', onSendData)
    // })
    //
    // return {
    //   order,
    //   v$,
    //   decrementCount,
    //   incrementCount,
    //   totalPrice,
    //   deleteProduct
    // }
  }
})
</script>

