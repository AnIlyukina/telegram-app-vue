<template>
  <v-form ref="form">
    <div class="mb-3 mt-2">
      <v-text-field
        v-model="stateForm.city"
        :error-messages="v$.city.$errors.map(e => e.$message)"
        :disabled="!order.length"
        type="input"
        label="Город"
        color="primary"
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
        clearable
        type="input"
        label="Адрес"
        required
        color="primary"
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
          clearable
          type="input"
          label="Домофон"
          required
          color="primary"
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
          clearable
          type="input"
          label="Этаж"
          required
          color="primary"
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
      label="Способ оплаты"
      item-title="type"
      item-value="value"
      color="primary"
      variant="outlined"
      density="compact"
      required
    />
  </v-form>
</template>

<script>
import {defineComponent, reactive} from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
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
    }
  },
  setup () {
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

    return {
      stateForm,
      v$
    }
  }
})
</script>


