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
          <el-option label="科室" value="科室"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button @click="resetDoctorPage">重置</el-button>
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
          action="http://localhost:7777/doctor/addFromExcel"
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
        :data="doctorTable"
        border
        stripe
        highlight-current-row
        style="width: fit-content;margin-top: 40px"
        empty-text="暂无预约情况"
        :default-sort="{prop: 'departId', order: 'ascending'}">
        <el-table-column
          prop="user.userName"
          label="医护人员用户名"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="doctorName"
          label="医护人员姓名"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="departId"
          label="科室"
          width="150"
          :formatter="departFormatter">
        </el-table-column>
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
          <!--label="时间段"-->
          <!--width="110">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="plain" @click="showTimeSlot(scope.row)">详情</el-button>-->
          <!--</template>-->
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
              @click="deleteSingleDoctor(scope.row)">删除医护人员
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
        :total="doctorTableLength"
        style="margin-right: 0%;">
      </el-pagination>
    </el-row>
    <!--批量删除-->
    <el-dialog :title="'批量删除'" :visible.sync="dialogVisible.deleteVisible">
      <el-form :model="selectDepart" label-width="100px">
        <el-form-item label="指定科室" prop="depart">
          <el-select v-model="selectDepart.depart" placeholder="请选择">
            <el-option
              v-for="item in departTable"
              :key="item.departId"
              :label="item.departName"
              :value="item.departId">
            </el-option>
            <el-option key="-1" label="全部科室" value="-1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('delete')">取消</el-button>
          <el-button @click="deleteDoctorBatch" type="primary">删除</el-button>
        </span>
    </el-dialog>
    <!--修改信息-->
    <el-dialog :title="'修改信息'" :visible.sync="dialogVisible.modifySingleVisible" width="40%">
      <el-form :model="doctorDetail" label-width="30%">
        <el-form-item label="医护人员姓名" prop="doctorName">
          <span>{{doctorDetail.doctorName}}</span>
        </el-form-item>
        <el-form-item label="科室" prop="departId">
          <el-select v-model="doctorDetail.departId" placeholder="请选择">
            <el-option
              v-for="item in departTable"
              :key="item.departId"
              :label="item.departName"
              :value="item.departId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="doctorDetail.phone" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="doctorDetail.email" style="width: 60%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('modify')">取消</el-button>
          <el-button @click="updateDoctorAllData" type="primary">确定</el-button>
        </span>
    </el-dialog>
    <!--新增一个-->
    <el-dialog :title="'新增医护人员'" :visible.sync="dialogVisible.addSingleVisible" width="40%">
      <el-form :model="doctorToAdd" label-width="30%">
        <el-form-item label="医护人员姓名" prop="doctorName">
          <el-input v-model="doctorToAdd.doctorName" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="科室" prop="departId">
          <el-select v-model="doctorToAdd.departId" placeholder="请选择">
            <el-option
              v-for="item in departTable"
              :key="item.departId"
              :label="item.departName"
              :value="item.departId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="doctorToAdd.phone" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="doctorToAdd.email" style="width: 60%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('add')">取消</el-button>
          <el-button @click="addSingleDoctor" type="primary">确定</el-button>
      </span>
    </el-dialog>
    <!--timeSlot-->
    <!--<el-dialog :title="'时间段详情'" :visible.sync="dialogVisible.timeSlotVisible" width="40%">-->
      <!--<el-table :data="timeSlotList" border>-->
        <!--<el-table-column property="startTime" label="开始时间" width="180" :formatter="timeFormatter"></el-table-column>-->
        <!--<el-table-column property="endTime" label="结束时间" width="180" :formatter="timeFormatter"></el-table-column>-->
        <!--<el-table-column property="isOrdered" label="预约情况" :formatter="orderedFormatter"></el-table-column>-->
      <!--</el-table>-->
      <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button @click="dialogVisible.timeSlotVisible=false" type="primary">确定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
  </div>

</template>

<script>
  import AllService from '../../../services/allservice.js'

  var allService = new AllService()
  export default {
    data () {
      return {
        doctorTable: [],
        doctorTableLength: 0,
        dialogVisible: {
          deleteVisible: false,
          addVisible: false,
          addSingleVisible: false,
          modifySingleVisible: false,
          deleteSingleVisible: false,
          timeSlotVisible: false
        },
        doctorDetail: {
          doctorName: '',
          gender: '',
          depart: '',
          phone: '',
          email: '',
          // deleteTimes: '',
          // deleteDate: '',
        },
        doctorToAdd:{
          doctorName: '',
          depart: '',
          phone: '',
          email: '',
          // deleteTimes: '',
          // deleteDate: '',
        },
        timeSlotList: [],
        selectDepart: {
          depart: '',
        },
        searchKey: '用户名',
        searchContent: '',

        departTable: [],
        currentPage: 1,
        pageSize: 10,
      }
    },
    created () {
      this.getDepartTable()
      this.initpage()
    },
    methods: {
      initpage () {
        this.getDoctorTable()
      },
      getDoctorTable () {
        var params = {
          pageNum: this.currentPage-1,
          pageSize: this.pageSize
        }
        allService.getAllDoctor(params, (isOk, data) => {
          if (isOk) {
            this.doctorTable = data.data.content
            this.doctorTableLength = data.data.totalElements
          }
        })
      },
      getDepartTable () {
        allService.getAllDepart({}, (isOk, data) => {
          if (isOk) {
            this.departTable = data.data
          }
        })
      },
      deleteDoctorBatch () {
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.selectDepart.depart == -1) {
            allService.deleteAllDoctor({}, (isOk, data) => {
              if (isOk) {
                this.$message.success('删除成功！')
                this.getDoctorTable()
              }
            })
          }
          else allService.deleteDoctorByDepart({departId: this.selectDepart.depart}, (isOk, data) => {
            if (isOk) {
              this.$message.success('删除成功！')
              this.getDoctorTable()
            }
          })
          this.closeDialog('delete')
        })
      },
      addSingleDoctor(){
        allService.addDoctor(this.doctorToAdd,(isOk,data)=>{
          if(data.message!=='error'){
            this.$message.success("新增成功")
            this.closeDialog('add')
            this.getDoctorTable();
          }else{
            this.$message.error(data.data)
          }
        })
      },
      search () {
        if(this.searchContent===null||this.searchContent===''){
          this.getDoctorTable()
        }
        else if (this.searchKey === '用户名') {
          allService.getDoctorDetailByName({doctorName: this.searchContent}, (isOk, data) => {
            if (data.data != null) {
              this.doctorTable = []
              this.doctorTable.push(data.data)
              this.doctorTableLength = 1
            } else {
              this.doctorTable = []
              this.doctorTableLength = 0
            }
          })
        }
        else if (this.searchKey === '科室') {
          var params = {
            departId: this.getDepartId(this.searchContent),
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
          console.log(params)
          allService.searchDoctorByDepart(params, (isOk, data) => {
            if (isOk) {
              this.doctorTable = data.data
              this.doctorTableLength = data.total
            }
          })
        }
      },
      updateDoctorAllData () {
        allService.updateDoctorAllData(this.doctorDetail, (isOk, data) => {
          if (isOk) {
            this.dialogVisible.modifySingleVisible = false
            this.$alert('修改成功')
            this.getDoctorTable()
          }
        })

      },
      deleteSingleDoctor (row) {

        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          allService.deleteDoctorById({doctorId: row.doctorId}, (isOk, data) => {
            if (isOk) {
              this.getDoctorTable()
              this.$alert('删除成功')
            }
          })
        })

      },
      // showTimeSlot(row){
      //   console.log(row);
      //   allService.getTimeSlotByDoctorId({doctorId: row.doctorId},(isOk,data)=>{
      //     if(isOk){
      //       this.timeSlotList=data.data;
      //       this.dialogVisible.timeSlotVisible=true;
      //     }
      //   })
      // },
      resetDoctorPage () {
        this.getDoctorTable()
        this.searchKey = '用户名'
        this.searchContent = ''
      },
      handleAvatarSuccess (res, file) {
        if(res.message==='error'){
          this.$message.error(res.data)
        }
        else {
          this.$alert('上传成功')
          this.getDepartTable()
          this.getDoctorTable()
        }
      },
      beforeAvatarUpload (file) {
        // console.log(file);
        const isJPG = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传文件只能是xlxs格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!')
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
        this.doctorDetail = JSON.parse(JSON.stringify(row))//deep copy
        this.dialogVisible.modifySingleVisible = true
      },
      closeDialog (arg) {
        if (arg === 'delete') {
          this.dialogVisible.deleteVisible = false
          this.selectDepart.depart = ''
        }
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
      departFormatter (row) {
        var temp = row.departId
        for (var i = 0; i < this.departTable.length; i++) {
          if (temp === this.departTable[i].departId) {
            return this.departTable[i].departName
          }
        }
      },
      // orderedFormatter(row){
      //   console.log(row)
      //   if(row.isOrdered===0){
      //     return '未预约';
      //   }else return '已预约';
      // },
      getDepartId (temp) {
        for (var i = 0; i < this.departTable.length; i++) {
          if (temp === this.departTable[i].departName) {
            return this.departTable[i].departId
          }
        }
      },
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
