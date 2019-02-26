<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="searchKey" placeholder="请选择">
          <el-option label="用户名" value="用户名"></el-option>
          <!--<el-option label="院系" value="院系"></el-option>-->
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button @click="resetPatientPage">重置</el-button>
      </el-col>
      <el-col :span="2" :offset="3">
        <el-button type="primary" @click="showDialog('add')">新增</el-button>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="danger" @click="showDialog('delete')">批量删除</el-button>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-upload
          class="upload-demo"
          action="http://localhost:7777/patient/addFromExcel"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          multiple
          :show-file-list="false">
          <el-button type="primary">批量增加</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        align="left"
        :data="patientTable"
        border
        stripe
        highlight-current-row
        style="width: fit-content;margin-top: 40px"
        empty-text="暂无预约情况"
        :default-sort="{prop: 'patientId', order: 'ascending'}">
        <el-table-column
          prop="user.userName"
          label="患者用户名"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="patientName"
          label="患者姓名"
          sortable
          width="150"
          :formatter="patientFormatter">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="departId"-->
          <!--label="院系"-->
          <!--sortable-->
          <!--width="120"-->
          <!--:formatter="departFormatter">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="phone"
          label="手机"
          width="150">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="150">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="deleteTimes"-->
          <!--label="取消预约次数"-->
          <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="deleteDate"-->
          <!--label="最近一次取消"-->
          <!--width="160"-->
          <!--:formatter="timeFormatter">-->
        <!--</el-table-column>-->
        <el-table-column
          label="操作"
          width="220">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="warning"
              @click="showModifyDialog(scope.row)">修改信息
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteSinglePatient(scope.row)">删除患者
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="patientTableLength"
        style="margin-right: 0%;">
      </el-pagination>
    </el-row>
    <!--批量删除-->
    <!--<el-dialog :title="'批量删除'" :visible.sync="dialogVisible.deleteVisible">-->
      <!--<el-form :model="selectDepart" label-width="100px">-->
        <!--<el-form-item label="指定院系" prop="depart">-->
          <!--<el-select v-model="selectDepart.depart" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in departTable"-->
              <!--:key="item.departId"-->
              <!--:label="item.departName"-->
              <!--:value="item.departId">-->
            <!--</el-option>-->
            <!--<el-option key="-1" label="全部院系" value="-1"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button @click="closeDialog('delete')">取消</el-button>-->
          <!--<el-button @click="deletePatientBatch" type="primary">删除</el-button>-->
        <!--</span>-->
    <!--</el-dialog>-->
    <!--修改信息-->
    <el-dialog :title="'修改信息'" :visible.sync="dialogVisible.modifySingleVisible" width="40%">
      <el-form :model="patientDetail" label-width="30%">
        <el-form-item label="患者姓名" prop="patientName">
          <span>{{patientDetail.patientName}}</span>
        </el-form-item>
        <!--<el-form-item label="院系" prop="departId">-->
          <!--<el-select v-model="patientDetail.departId" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in departTable"-->
              <!--:key="item.departId"-->
              <!--:label="item.departName"-->
              <!--:value="item.departId">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="手机" prop="phone">
          <el-input v-model="patientDetail.phone" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="patientDetail.email" style="width: 60%"></el-input>
        </el-form-item>
        <!--<el-form-item label="取消预约次数" prop="deleteTimes">-->
          <!--<el-input v-model="patientDetail.deleteTimes" style="width: 60%"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="最近一次取消" prop="deleteDate">-->
          <!--<el-date-picker-->
            <!--v-model="patientDetail.deleteDate"-->
            <!--type="datetime"-->
            <!--placeholder="选择日期时间">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('modify')">取消</el-button>
          <el-button @click="updatePatientDetail" type="primary">确定</el-button>
        </span>
    </el-dialog>
    <!--新增一个-->
    <el-dialog :title="'新增患者'" :visible.sync="dialogVisible.addSingleVisible" width="40%">
      <el-form :model="patientToAdd" label-width="30%">
        <el-form-item label="患者姓名" prop="patientName">
          <el-input v-model="patientToAdd.patientName" style="width: 60%"></el-input>
        </el-form-item>
        <!--<el-form-item label="院系" prop="departId">-->
          <!--<el-select v-model="patientToAdd.departId" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in departTable"-->
              <!--:key="item.departId"-->
              <!--:label="item.departName"-->
              <!--:value="item.departId">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="手机" prop="phone">
          <el-input v-model="patientToAdd.phone" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="patientToAdd.email" style="width: 60%"></el-input>
        </el-form-item>
        <!--<el-form-item label="取消预约次数" prop="deleteTimes">-->
          <!--<el-input v-model="patientToAdd.deleteTimes" style="width: 60%"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="最近一次取消" prop="deleteDate">-->
          <!--<el-date-picker-->
            <!--v-model="patientToAdd.deleteDate"-->
            <!--type="datetime"-->
            <!--placeholder="选择日期时间">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('add')">取消</el-button>
          <el-button @click="addSinglePatient" type="primary">确定</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
  import AllService from '../../../services/allservice.js'

  var allService = new AllService()
  export default {
    data () {
      return {
        patientTable: [],
        patientTableLength: 0,
        dialogVisible: {
          deleteVisible: false,
          addVisible: false,
          addSingleVisible: false,
          modifySingleVisible: false,
          deleteSingleVisible: false
        },
        patientDetail: {

          patientName: '',
          // depart: '',
          phone: '',
          email: '',
          // deleteTimes: '',
          // deleteDate: '',
        },
        patientToAdd:{
          patientName: '',
          // depart: '',
          phone: '',
          email: '',
          // deleteTimes: '',
          // deleteDate: '',
        },
        // selectDepart: {
        //   depart: '',
        // },
        searchKey: '用户名',
        searchContent: '',

        // departTable: [],
        currentPage: 1,
        pageSize: 10,
      }
    },
    created () {
      // this.getDepartTable()
      this.initpage()
    },
    methods: {
      initpage () {
        this.getPatientTable()
      },
      handleSelect (index, indexPath) {
        this.mode = index
      },
      getPatientTable () {
        var params = {
          pageNum: this.currentPage-1,
          pageSize: this.pageSize
        }
        allService.getAllPatient(params, (isOk, data) => {
          if (isOk) {
            this.patientTable = data.data.content
            this.patientTableLength = data.data.totalElements
          }
        })
      },
      // getDepartTable () {
      //   allService.getAllDepart({}, (isOk, data) => {
      //     if (isOk) {
      //       this.departTable = data.data
      //     }
      //   })
      // },
      // 批量删除
      // deletePatientBatch () {
      //   this.$confirm('确定要删除吗？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     if (this.selectDepart.depart == -1) {
      //       allService.deleteAllPatient({}, (isOk, data) => {
      //         if (isOk) {
      //           this.$message.success('删除成功！')
      //           this.getPatientTable()
      //         }
      //       })
      //     }
      //     else allService.deletePatientByDepart({departId: this.selectDepart.depart}, (isOk, data) => {
      //       if (isOk) {
      //         this.$message.success('删除成功！')
      //         this.getPatientTable()
      //       }
      //     })
      //     this.closeDialog('delete')
      //   })
      // },
      addSinglePatient(){
        allService.addPatient(this.patientToAdd,(isOk,data)=>{
          if(data.message!=='error'){
            this.$message.success("新增成功")
            this.closeDialog('add')
            this.getPatientTable();
          }else{
            this.$message.error(data.data)
          }
        })
      },
      search () {
        if(this.searchContent===null||this.searchContent===''){
          this.getPatientTable()
        }
        else if (this.searchKey === '用户名') {
          allService.getPatientDetailBN({patientName: this.searchContent}, (isOk, data) => {
            if (data.data != null) {
              this.patientTable = []
              this.patientTable.push(data.data)
              this.patientTableLength = 1
            } else {
              this.patientTable = []
              this.patientTableLength = 0
            }
          })
        }
        // else if (this.searchKey === '院系') {
        //   var params = {
        //     departId: this.getDepartId(this.searchContent),
        //     pageNum: this.currentPage,
        //     pageSize: this.pageSize
        //   }
        //   console.log(params)
        //   allService.searchPatientByDepart(params, (isOk, data) => {
        //     if (isOk) {
        //       this.patientTable = data.data
        //       this.patientTableLength = data.total
        //     }
        //   })
        // }
      },
      updatePatientDetail () {
        allService.updatePatient(this.patientDetail, (isOk, data) => {
          if (isOk) {
            this.dialogVisible.modifySingleVisible = false
            this.$alert('修改成功')
            this.getPatientTable()
          }
        })

      },
      deleteSinglePatient (row) {

        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          allService.deletePatientById({patientId: row.patientId}, (isOk, data) => {
            if (isOk) {
              this.getPatientTable()
              this.$alert('删除成功')
            }
          })
        })

      },
      resetPatientPage () {
        this.getPatientTable()
        this.searchKey = '用户名'
        this.searchContent = ''
      },
      handleAvatarSuccess (res, file) {
        if(res.message==='error'){
          this.$message.error(res.data)
        }
        else {
          this.$alert('上传成功')
          // this.getDepartTable()
          this.getPatientTable()
        }
      },
      beforeAvatarUpload (file) {
        // console.log(file);
        const isJPG = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },

      showDialog (arg) {
        if (arg === 'delete') {
          this.dialogVisible.deleteVisible = true
        }
        if (arg === 'add') {
          this.dialogVisible.addSingleVisible = true
        }
      },
      showModifyDialog (row) {
        console.log(row)
        this.patientDetail = JSON.parse(JSON.stringify(row))//deep copy
        this.dialogVisible.modifySingleVisible = true
      },
      closeDialog (arg) {
        // if (arg === 'delete') {
        //   this.dialogVisible.deleteVisible = false
        //   this.selectDepart.depart = ''
        // }
        if (arg === 'modify') {
          this.dialogVisible.modifySingleVisible = false
        }
        if(arg==='add'){
          this.dialogVisible.addSingleVisible = false
        }
      },

      timeFormatter (row, column) {
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
      // departFormatter (row) {
      //   var temp = row.departId
      //   for (var i = 0; i < this.departTable.length; i++) {
      //     if (temp === this.departTable[i].departId) {
      //       return this.departTable[i].departName
      //     }
      //   }
      // },
      patientFormatter (row) {
        var temp = row.patientId
        for (var i = 0; i < this.patientTable.length; i++) {
          if (temp === this.patientTable[i].patientId) {
            return this.patientTable[i].patientName
          }
        }
      },
      // getDepartId (temp) {
      //   for (var i = 0; i < this.departTable.length; i++) {
      //     if (temp === this.departTable[i].departName) {
      //       return this.departTable[i].departId
      //     }
      //   }
      // },
      handleCurrentChange (val) {
        this.currentPage = val
        this.search()
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.search()
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
