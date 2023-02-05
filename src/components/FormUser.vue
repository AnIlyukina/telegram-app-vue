<template>
  <div class="form">
    <h3>Введите ваши данные</h3> 
    <input class='input' type="text" placeholder="Страна"/>
    <input class='input' type="text" placeholder="Улица"/>
    <select class="select">
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
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormUser'
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
