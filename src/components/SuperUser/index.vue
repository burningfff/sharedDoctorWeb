<template>
  <div>
    <el-row class="container">
      <el-col :span="24" class="topbar-wrap">
        <div class="topbar-title">
          <span style="font-size: 18px;color: #fff;">超级用户管理中心</span>
        </div>
        <div class="topbar-account">
          <span style="font-size: 18px;color: #fff;">Hi! </span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link userinfo-inner" style="font-size: 18px;color: #fff;"><i
            class="iconfont icon-user"></i>{{userName}}<i
            class="iconfont icon-down"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>

    <el-menu
      default-active="1"
      class="mysidebar"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">普通患者信息管理</el-menu-item>
      <el-menu-item index="2">医护人员信息管理</el-menu-item>
      <el-menu-item index="3">订单及医院信息管理</el-menu-item>
    </el-menu>

    <div style="margin-left: 300px;margin-top: 5%" v-show="mode==1">
      <patient></patient>
    </div>

    <div style="margin-left: 300px;margin-top: 5%" v-show="mode==2">
      <doctor></doctor>
    </div>

    <div style="margin-left: 300px;margin-top: 5%" v-show="mode==3">
      <order></order>
    </div>

  </div>

</template>

<script>
  import AllService from '../../services/allservice.js'
  import patient from './components/patient'
  import doctor from './components/doctor'
  import order from './components/order'

  var allService = new AllService()
  export default {
    components: {
      patient,
      doctor,
      order,
    },
    data () {
      return {
        // userName: LOCWIN.Cache.get('userInfo').userName,
        userName: 'admin',
        mode: 1,
      }
    },
    methods: {
      handleSelect (index, indexPath) {
        this.mode = index
      },
      logout () {
        // LOCWIN.Cache.clear()
        this.$router.push('/login')
      },
    }

  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .mysidebar {
    transition: width .28s;
    width: 250px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
</style>

<style scoped>
  .el-row {
    margin-bottom: 0px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .hello-div {
    margin-top: 140px;
    text-align: left;
    margin-left: 30px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

<style scoped lang="scss">
  .img-div {
    width: 100%;
    height: 100%;

  .user-img {
    width: 100%;
    height: 100%;
  }

  }
  .container {
    position: fixed;
    top: 0px;
    bottom: 0px;
    width: 100%;
    height: fit-content;
    z-index: 1002;

  .topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0px;

  .topbar-btn {
    color: #fff;
  }

  /*.topbar-btn:hover {*/
  /*background-color: #4A5064;*/
  /*}*/
  .topbar-logo {
    float: left;
    width: 59px;
    line-height: 26px;
  }

  .topbar-logos {
    float: left;
    width: 120px;
    line-height: 26px;
  }

  .topbar-logo img, .topbar-logos img {
    height: 40px;
    margin-top: 5px;
    margin-left: 2px;
  }

  .topbar-title {
    float: left;
    text-align: left;
    width: 200px;
    padding-left: 10px;
    border-left: 1px solid #000;
  }

  .topbar-account {
    float: right;
    padding-right: 12px;
  }

  .userinfo-inner {
    cursor: pointer;
    color: #fff;
    padding-left: 10px;
  }

  .input-inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }

  }
  .main {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0px;
    overflow: hidden;
  }

  aside {
    min-width: 50px;
    background: #333744;

  &
  ::-webkit-scrollbar {
    display: none;
  }

  &
  .showSidebar {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-menu {
    height: 100%; /*写给不支持calc()的浏览器*/
    height: -moz-calc(100% - 80px);
    height: -webkit-calc(100% - 80px);
    height: calc(100% - 80px);
    border-radius: 0px;
    background-color: #333744;
    border-right: 0px;
  }

  .el-submenu .el-menu-item {
    min-width: 60px;
  }

  .el-menu {
    width: 180px;
  }

  .el-menu--collapse {
    width: 60px;
  }

  .el-menu .el-menu-item, .el-submenu .el-submenu__title {
    height: 46px;
    line-height: 46px;
  }

  .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
    background-color: #7ed2df;
  }

  }

  .menu-toggle {
    background: #4A5064;
    text-align: center;
    color: white;
    height: 26px;
    line-height: 30px;
  }

  .content-container {
    background: #fff;
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    padding-bottom: 1px;

  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }

  }
  }
</style>
