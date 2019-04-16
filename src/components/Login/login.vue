<template>
  <div style="margin-top: 0px;">
    <el-container style="margin: 0px;height: 100vh">
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
            用户登录
          </div>
        </el-header>

        <el-main>
          <div>
            <el-row style="margin-left: 20%; text-align:left; font-size: 36px">
              欢迎使用共享医生管理系统
            </el-row>
            <el-row style="margin-left: 20%; text-align:left;">
              <el-form :model="form" status-icon :rules="rules2" ref="form" class="demo-ruleForm">
                <el-form-item prop="username">
                  <el-input type="text" v-model="form.username" auto-complete="off" style="width: 400px;
                    margin-bottom:1%; text-align: left;  font-size: 20px; height: 50px; line-height: 50px;" placeholder="用户名" clearable>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="form.password" auto-complete="off" style="width: 400px;
                    margin-bottom:1%; text-align: left;  font-size: 20px; height: 50px; line-height: 50px;" placeholder="密码" clearable></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width: 400px;font-size: 20px" @click.native.prevent="onSubmit">立即登录</el-button>
                  <!--<el-button @click="resetForm('form')">重置</el-button>-->
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
      return {
        form: {
          username:'',
          password: ''
        },
        rules2: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      onSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.login()
          }
        })
      },
      login() {
        var params = {
          userName: this.form.username,
          password: this.form.password
        }
        allService.signIn(params, (isOk, data) => {
          if (isOk) {
            if (data.status == "false") {
              console.log(data.data);
              this.$message.error(data.data);
            } else {
              console.log(data.data);
              if (data.data === 'root') {
                this.$message.success("登录成功！")
                this.$router.push('/SuperUser/index');
              }
            }
          } else {
            this.$alert("登录失败！")
          }
        })
      },
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
