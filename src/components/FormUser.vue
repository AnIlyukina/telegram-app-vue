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
import { defineComponent, watchEffect, computed, ref } from 'vue'
import { useTelegram } from '@/hooks/useTelegram.js'

export default defineComponent({
  name: 'FormUser',
  setup() {
    const { tg } = useTelegram()
    tg.mainButton.setParams({
      text: 'Отправить данные'
    })


    watchEffect(() => {
      if (!!city.value && !!street.value) {
        tg.MainButton.hide()
      } else {
        tg.MainButton.show()
      }
    }, {  
      flush: 'post'
    });

    let city = ref('')
    let street = ref('')
    let subject = ref('')

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
