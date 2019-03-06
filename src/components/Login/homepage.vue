<template>
  <div>
    <el-row class="container">
      <el-col :span="24" class="topbar-wrap">
        <div class="topbar-title">
          <span style="font-size: 18px;color: #fff;">共享医生</span>
        </div>

        <div class="topbar-account">
          <span style="font-size: 18px;color: #fff;">HI! </span>
          <div v-if="user.userName==null">
            <span style="font-size: 18px;color: #fff;">请先登录</span>
          </div>

          <el-dropdown trigger="click" v-if="user.userName!=null">
            <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{user.userName}} <i
              class="iconfont icon-down"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="goto('/student/infopage')"><span style="color: #555;font-size: 14px;">预约状况</span></div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="goto('/student/info')"><span style="color: #555;font-size: 14px;">修改信息</span></div>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 5%;">
      <el-col :span="8" :offset="8">
        <el-input
          style="width: 80%"
          placeholder="请输入要查询的教师名"
          v-model="blurSearch">
          <el-button slot="append" icon="el-icon-search" @click="getTeacherTable()">查询</el-button>
        </el-input>
      </el-col>
    </el-row>


    <el-row type="flex" align="middle" style="margin-top: 30px;">
      <el-col :span="6" :offset="1" style="text-align: left">
        <el-menu default-active="1" @open="handleOpen" @close="handleClose" :collapse="true"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 style="width: 200px">
          <i class="el-icon-menu" style="color: #ffffff;size: 18px;font-size:18px;margin: 10px"> 快速找医生</i>
          <i class="el-icon-departkeshi" style="color: #cdcdcd;size: 18px;margin: 10px"> 科室</i>

          <el-submenu index="1" style="width: 200px;">
            <template slot="title">
              外科 心胸外科 手外科 <i class="el-icon-arrow-right" style="color: #cdcdcd;size: 18px;margin: 10px"></i>
            </template>
            <!--<el-menu-item-group>-->
            <el-menu-item index="1-1" style="width:800px">
              <div>
                <el-row>
                  <el-col :span="2">
                    <div class="grid-content ">心胸外科</div>
                  </el-col>
                  <el-col :offset="2" :span="2">
                    <div class="grid-content ">
                      <el-button type="text">woqu</el-button>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content ">
                      <el-button type="text">woqu</el-button>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content ">
                      <el-button type="text">woqu</el-button>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content ">
                      <el-button type="text">woqu</el-button>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content ">
                      <el-button type="text">woqu</el-button>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div class="grid-content ">
                      <el-button type="text">所有疾病</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-menu-item>
            <!--</el-menu-item-group>-->
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2" style="width: 200px">
            <template slot="title">
              {外科 心胸外科 手外科}
              <i class="el-icon-location">
                <!--外科 心胸外科 手外科-->
              </i>
              <!--<span>{外科 心胸外科 手外科}</span>-->
              <!--<span slot="title">外科 心胸外科 手外科</span>-->
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <span slot="title">选项4</span>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!--<el-menu-item index="3" disabled>-->
            <!--<i class="el-icon-document"></i>-->
            <!--<span slot="title">导航三</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="4">-->
            <!--<i class="el-icon-setting"></i>-->
            <!--<span slot="title">导航四</span>-->
          <!--</el-menu-item>-->
        </el-menu>

      </el-col>
      <!--<el-col :span="2" v-for="depart in departTable">-->
      <!--<el-button type="text" @click="searchTeacherByDepart(depart.departId)">{{depart.departName}}</el-button>-->
      <!--</el-col>-->
    </el-row>

    <el-row>
      <el-col :span="14" :offset="1">
        <el-row :gutter="20">
          <!--<el-col :span="6" v-for="teacher in teacherTable" style="margin-top: 40px">-->
          <!--<el-card :body-style="{ padding: '0px' }">-->
          <!--<img class="image" :src="teacher.imageUrl" v-if="teacher.imageUrl!=null&&teacher.imageUrl!=''"/>-->
          <!--<img class="image" src="../../assets/logo.png" v-if="teacher.imageUrl==null||teacher.imageUrl==''"/>-->
          <!--<div style="padding: 14px;">-->
          <!--<span>{{teacher.teacherName}}</span>-->
          <!--<div class="bottom clearfix">-->
          <!--<el-button type="text" class="button" @click="orderTeacher(teacher)">去预约</el-button>-->
          <!--</div>-->
          <!--</div>-->
          <!--</el-card>-->
          <!--</el-col>-->
        </el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 8, 12]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="teacherTableLength"
          style="float:right">
        </el-pagination>
      </el-col>

      <el-col :span="8" :offset="1" class="bg-purple-light">
        <span>最新教师发布通知</span>
        <el-table
          :data="messageTable"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="teacherName"
            label="教师名">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间"
            :formatter="timeFormatter">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间"
            :formatter="timeFormatter">
          </el-table-column>
          <el-table-column
            prop="操作"
            label="去预约">
            <template slot-scope="scope">
              <el-button @click="orderTeacher(scope.row)" type="text" size="small">去预约</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


  </div>

</template>

<script>
  import AllService from '../../services/allservice.js'

  var allService = new AllService()
  export default {
    created() {
      this.initpage()
    },
    data() {
      return {
        user: {
          userName: 'cuiyang',
          userInfo: 'cuiyang'
        },
        blurSearch: '',
        teacherTable: [],
        messageTable: [],

        departTable: [],

        pageSize: 8,
        currentPage: 1,
        teacherTableLength: 0,

        lastOp: 0,//0代表blurSearch, 1代表departId
        lastDepart: '',
        menuList: [
          {
            label: "菜单一",
            children: [
              {
                label: "二级菜单_1",
                children: [
                  {
                    label: "三级菜单_1",
                    children: [
                      {
                        label: "四级菜单_1"
                      }
                    ]
                  }
                ]
              },
              {
                label: "二级菜单_2",

              }
            ]
          },
          {
            label: "菜单二",
            children: [
              {
                label: "二级菜单",
                children: [
                  {
                    label: "三级菜单_1"
                  }
                ]
              }
            ]
          }
        ],
      }
    },
    methods: {
      initpage() {
        this.user.userName = LOCWIN.Cache.get('userName')
        this.user.userInfo = LOCWIN.Cache.get('userInfo')
        console.log(this.user)
        if (this.lastOp === 0) {
          this.getTeacherTable()
        } else if (this.lastOp === 1) {
          this.searchTeacherByDepart(this.lastDepart)
        }

        this.getMessageTable()
        this.getDepartTable()
      },
      logout() {
        LOCWIN.Cache.clear()
        this.$router.push('/login')
      },
      goto(url) {
        console.log(url)
        this.$router.push(url)
      },
      orderTeacher(teacher) {
        console.log(teacher)
        LOCWIN.Cache.set('teacherId', teacher.teacherId)
        LOCWIN.Cache.set('teacherName', teacher.teacherName)

        this.$router.push('/teacher/addOrder')
      },
      getTeacherTable() {
        this.lastOp = 0
        var params = {
          teacherName: this.blurSearch,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        allService.blurSearchTeacher(params, (isOk, data) => {
          this.teacherTable = data.data
          this.teacherTableLength = data.total
        })
        console.log(this.teacherTable)
      },
      getMessageTable() {
        var params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }

        allService.getAllMessage(params, (isOk, data) => {
          if (isOk) {
            this.messageTable = data.data
          }
        })
      },
      getDepartTable() {
        allService.getAllDepart({}, (isOk, data) => {
          if (isOk) {
            this.departTable = data.data
          }
        })
      },
      searchTeacherByDepart(depart) {
        this.lastOp = 1
        this.lastDepart = depart
        var params = {
          departId: depart,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        allService.searchTeacherByDepart(params, (isOk, data) => {
          if (isOk) {
            this.teacherTable = data.data
            this.teacherTableLength = data.total
          }
        })
      },
      timeFormatter(row, column) {
        var date = new Date(row[column.property])

        if (date == undefined) {
          return ''
        }
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        var minute = date.getMinutes()
        minute = minute < 10 ? ('0' + minute) : minute
        var second = date.getSeconds()
        second = second < 10 ? ('0' + second) : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.initpage()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.initpage()
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }

  }

</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-submenu__title {
    font-size: 14px;
    color: #303133;
    padding: 0 0px;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-row {
    margin-bottom: 20px;

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

  .bg-purple-light {
    background: #e5e9f2;
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
    height: 177px;
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
  .container {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    width: 100%;

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
    border-right: solid 0px #74e621;
    border-right-width: 0px;
    border-right-style: solid;
    border-right-color: rgb(230, 31, 45);
    list-style: none;
    list-style-type: none;
    list-style-position: initial;
    list-style-image: initial;
    position: relative;
    margin: 0;
    padding-left: 0;
  }

  .el-submenu .el-menu-item {
    min-width: 200px;
  }

  .el-menu {
    width: 200px;
  }

  .el-menu--collapse {
    width: 200px;
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
