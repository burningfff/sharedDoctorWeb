<template>
  <div style="margin-top: 0px">
    <el-container style="margin: 0px">
      <el-aside width="32%">
        <div>
          <el-row>
            <div class="img-div">
              <img class="user-img" src="../../assets/logo.png"/>
            </div>
          </el-row>
        </div>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 20px;" height="12%">
          <div>
            用户注册
          </div>
        </el-header>

        <el-main>
          <div>
            <el-row style="margin-left: 20%; text-align:left; font-size: 36px">
              欢迎注册共享医生
            </el-row>
            <el-row style="margin-left: 20%; text-align:left;">
              <el-form :model="register" status-icon :rules="rules2" ref="register" class="demo-ruleForm">
                <!--<h3 class="title">用户注册</h3>-->
                <el-form-item prop="username">
                  <el-input type="text" v-model="register.username" auto-complete="off" style="width: 400px;
                    margin-bottom:1%; text-align: left;  font-size: 20px; height: 50px; line-height: 50px;" placeholder="用户名" clearable>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="register.password" auto-complete="off" style="width: 400px;
                    margin-bottom:1%; text-align: left;  font-size: 20px; height: 50px; line-height: 50px;" placeholder="密码" clearable></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <el-input type="password" v-model="register.checkPass" auto-complete="off" style="width: 400px;
                    margin-bottom:1%; text-align: left;  font-size: 20px; height: 50px; line-height: 50px;" placeholder="确认密码" clearable></el-input>
                </el-form-item>
                <el-form-item style="font-size:20px">
                  <el-select v-model="register.identity" style="width: 400px;
                    margin-bottom:1%; font-size: 20px; height: 50px; line-height: 50px;" placeholder="用户身份" >
                    <el-option label="普通用户" value="0"></el-option>
                    <el-option label="医护人员" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('register')" style="width: 400px;font-size: 20px">立即注册</el-button>
                  <!--<el-button @click="resetForm('register')">重置</el-button>-->
                </el-form-item>
              </el-form>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import AllService from '../../services/allservice.js'
  var allService = new AllService()

  export default {
    data() {
      var checkUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.register.checkPass !== '') {
            this.$refs.register.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.register.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var checkIdentity = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('选择不能为空'));
        }
      };

      return {
        register: {
          username:'',
          password: '',
          checkPass: '',
          identity: ''
        },
        departTable: [],
        rules2: {
          username: [
            { validator: checkUsername, trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' ,}
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          identity: [
            { validator: checkIdentity, trigger: 'change' }
          ]

        }
      };
    },
    created () {
      this.initpage()
    },
    methods: {
      initpage (){

      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid);
            this.regist()
          } else {
            return false;
          }
        });
      },
      regist () {
        var params={
          userName:this.register.username,
          password:this.register.password,
          identity:this.register.identity,
        }
        allService.signUp(params, (isOk, data) => {
          if (isOk) {
            console.log(data);
            if(data.status==='false'){
              this.$message.error(data.data);
            }
            else {
              this.$message.success("注册成功！")
              this.$router.push('/login')
            }

          } else {
            this.$alert("注册失败！")
          }
        })
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // }
    }
  }
</script>

<style>
  body{
    margin:0;
    padding:0;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
