<template>
  <h1>Options API</h1>
  <a-form
    :ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item has-feedback label="Password" name="pass">
      <a-input
        v-model:value="formState.pass"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item has-feedback label="Confirm" name="checkPass">
      <a-input
        v-model:value="formState.checkPass"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item has-feedback label="Age" name="age">
      <a-input-number v-model:value="formState.age" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { reactive, ref, toRaw } from "vue";

export default {
  data() {
    return {
      layout: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      },
    };
  },
  created() {
    // Create
    this.formRef = ref();
    this.formState = reactive({});
    this.rules = reactive({
      pass: [
        {
          required: true,
          validator: this.validatePass,
          trigger: "change",
        },
      ],
      checkPass: [
        {
          validator: this.validatePass2,
          trigger: "change",
        },
      ],
      age: [
        {
          validator: this.checkAge,
          trigger: "change",
        },
      ],
    })
  },
  methods: {
    // validations
    async checkAge(_rule, value) {
      if (!value) {
        return Promise.reject("Please input the age");
      }
      if (!Number.isInteger(value)) {
        return Promise.reject("Please input digits");
      } else {
        if (value < 18) {
          return Promise.reject("Age must be greater than 18");
        } else {
          return Promise.resolve();
        }
      }
    },
    async validatePass(_rule, value) {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else {
        if (this.formState.checkPass !== "") {
          // this.formRef.value.validateFields("checkPass");
        }
        return Promise.resolve();
      }
    },
    async validatePass2(_rule, value) {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== this.formState.pass) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    },
    // events
    handleFinish(values) {
      console.log('handleFinish', values, this.formState)
    },
    handleFinishFailed(errors) {
      console.log('handleFinishFailed', errors)
    },
    resetForm() {
      console.log("reset")
      console.log(this.formRef)
      this.formRef.value.resetFields();
    },
    handleValidate(...args) {
      console.log('handleValidate', args);
    },
  },
};
</script>
