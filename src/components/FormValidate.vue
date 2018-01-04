<template>
  <div class="formbox">
    <canvas height="620" width="1300" id="canvas" style="position: absolute; height: 100%;"></canvas>
    <div class="formbox-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
            欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="formData" :rules="rules">
            <FormItem prop="userName" label="用户名">
               <Input v-model="formData.userName" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem prop="phoneNumber" label="手机号">
               <Input v-model="formData.phoneNumber" placeholder="请输入手机号"></Input>
            </FormItem>
            <FormItem prop="email" label="邮箱">
               <Input v-model="formData.email" placeholder="请输入邮箱"></Input>
            </FormItem>
            <FormItem prop="password" label="密码">
               <Input type="password" v-model="formData.password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem prop="password2" label="确认密码">
               <Input type="password2" v-model="formData.password2" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem prop="gender" label="性别">
              <Radio-group v-model="formData.gender">
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
              </Radio-group>
            </FormItem>
            <FormItem prop="interest" label="爱好">
              <Checkbox-group v-model="formData.interest">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
              </Checkbox-group>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="error-message">{{formData.errorMessage}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import loginBG from '@/libs/login-bg.js'

export default {
  name: 'FormValidate',
  data () {
    const userNameValidate = (rule, value, callback) => {
      if(value){
        callback(new Error(value))
      }else{
        callback()
      }
    }
    , passwordValidate = (rule, value, callback) => {
      if(value){
        callback(new Error(value))
      }else{
        callback()
      }
    }
    , phoneNumberValidate = (rule, value, callback) => {
      if(value){
        callback(new Error(value))
      }else{
        callback()
      }
    }
    return {
      formData: {
        userName: '',
        password: '',
        password2: '',
        email: '',
        gender: '',
        interest: [],
        phoneNumber: '',
        errorMessage: ''
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: userNameValidate, trigger: 'blur'}
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
          { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
        ],
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { type: 'number', len: 11,  message: '请输入正确的手机号', trigger: 'change' },
          { validator: phoneNumberValidate, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '密码应为6-20位数字，字母的组合', trigger: 'change' },
          { validator: passwordValidate, trigger: 'blur'}
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: passwordValidate, trigger: 'blur'}
        ]
      },
    }
  },
  mounted() {
    loginBG._main_()
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('submit')
        }else{
          console.log(valid)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import './FormValidate.less';
</style>
