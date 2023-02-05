<template>
  <div class="form">
    <h3>Введите ваши данные</h3> 
    <input 
      v-model="city"
      class='input'
      type="text"
      placeholder="Город"/>
    <input
      v-model="street"
      class='input'
      type="text"
      placeholder="Улица"/>
    <select
      v-model="subject"
      class="select">
      <option value="physical">
        Физ. лицо 
      </option>
      <option value="legal">
        Юр. лицо 
      </option>
    </select>
  </div>
</template>

<script>
import { defineComponent, watchEffect, ref, onMounted,onUnmounted } from 'vue'
import { useTelegram } from '@/hooks/useTelegram.js'

export default defineComponent({
  name: 'FormUser',
  setup() {
    const { tg } = useTelegram()
    
    let city = ref('')
    let street = ref('')
    let subject = ref('physical')
    onMounted(()=> {
      console.log('mounted')
      tg.mainButton.setParams({
        text: 'Отправить данные'
      })
      // eslint-disable-next-line no-undef
      tg.onEvent('mainButtonClicked', onSendData)
    })

    onUnmounted(() => {
      // eslint-disable-next-line no-undef
      tg.offEvent('mainButtonClicked', onSendData)
    })

    // eslint-disable-next-line no-undef
    const onSendData = () => {
      const data = {
        city: city.value,
        street: street.value,
        subject: subject.value
      }
      tg.sendData(JSON.stringify(data))
    } 


    watchEffect(() => {
      if (!!city.value && !!street.value) {
        tg.MainButton.show()
      } else {
        tg.MainButton.hide()
      }
    }, {  
      flush: 'post'
    });

    return {
      city,
      street,
      subject
    }
  }
})
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.input {
  padding: 10px;
  margin-top: 15px;
}

.select {
  padding: 10px;
  margin-top: 15px;
}
</style>
