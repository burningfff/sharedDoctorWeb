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
        <el-button type="primary" @click="showDialog('add')">新增医护人员</el-button>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="danger" @click="deleteDoctorBatch">删除所选医护人员</el-button>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-upload
          class="upload-demo"
          action="http://localhost:7777/doctor/addFromExcel"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          multiple
          :show-file-list="false">
          <el-button type="primary">批量新增医护人员</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        align="left"
        :data="doctorTable"
        stripe
        highlight-current-row
        style="width: fit-content;margin-top: 40px"
        empty-text="暂无医护人员信息"
        :default-sort="{prop: 'doctorId', order: 'ascending'}"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="医护人员 ID">
                <span>{{ props.row.doctorId }}</span>
              </el-form-item>
              <el-form-item label="医护人员用户名">
                <span>{{ props.row.user.userName }}</span>
              </el-form-item>
              <el-form-item label="医护人员姓名">
                <span>{{ props.row.doctorName }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.gender }}</span>
              </el-form-item>
              <el-form-item label="身份证号">
                <span>{{ props.row.identityCard }}</span>
              </el-form-item>
              <el-form-item label="年龄">
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="科室">
                <span>{{ props.row.depart.departName }}</span>
              </el-form-item>
              <el-form-item label="职称">
                <span>{{ props.row.qualification.position.positionName }}</span>
              </el-form-item>
              <el-form-item label="住址">
                <span>{{ props.row.location.province+props.row.location.city+props.row.location.area+props.row.location.locationDetail}}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ props.row.phone}}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ props.row.email}}</span>
              </el-form-item>
              <el-form-item label="余额">
                <span>{{ props.row.balance.balance}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="doctorId"
          label="医护人员ID"
          width="300">
        </el-table-column>
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
          prop="qualification.isConfirmed"
          label="认证状态"
          width="150"
          :formatter="confirmedFormatter">
        </el-table-column>
        <el-table-column
          label="操作"
          width="360">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="plain"
              @click="showQualifyDialog(scope.row)">认证信息</el-button>
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
    <!--认证信息-->
    <el-dialog :title="'认证信息'" :visible.sync="dialogVisible.qualifySingleVisible" width="40%">
      <el-form :model="qualificationDetail" label-width="30%">
        <el-form-item label="医护人员姓名：" >
          <span>{{qualificationDetail.doctorName}}</span>
        </el-form-item>
        <el-form-item label="性别：">
          <span>{{qualificationDetail.gender }}</span>
        </el-form-item>
        <el-form-item label="身份证号：">
          <span>{{qualificationDetail.identityCard }}</span>
        </el-form-item>
        <el-form-item label="科室：" >
          <span>{{doctorDetail.depart.departName}}</span>
        </el-form-item>
        <el-form-item label="职称：">
          <span>{{qualificationDetail.qualification.position.positionName }}</span>
        </el-form-item>
        <el-form-item label="所属医院：">
          <span>{{qualificationDetail.hospitalId }}</span>
        </el-form-item>
        <el-form-item label="医护人员资质照片：" prop="imageUrl">
          <span>
            <div class="img-div">
              <viewer :images="images">
                <img v-for="src in images" :src="src" :key="src" class="img-div">
              </viewer>
              <!--<img class="user-img" src="../../../assets/logo.png"/>-->
            </div>
          </span>
        </el-form-item>
        <el-form-item label="医护人员资质认证：" prop="isConfirmed">
          <el-select v-model="qualificationDetail.qualification.isConfirmed" placeholder="请选择是否通过认证">
            <el-option
            v-for="item in qualificationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateQualification" type="primary">确认提交</el-button>
        <el-button @click="closeDialog('qualify')">取消</el-button>
      </span>
    </el-dialog>
    <!--修改信息-->
    <el-dialog :title="'修改信息'" :visible.sync="dialogVisible.modifySingleVisible" width="40%">
      <el-form :model="doctorDetail" label-width="25%" align="left" status-icon :rules="rules">
        <el-form-item label="医护人员姓名:" prop="doctorName">
          <span>{{doctorDetail.doctorName}}</span>
        </el-form-item>
        <el-form-item label="性别:" prop="gender">
          <el-select v-model="doctorDetail.gender" placeholder="请选择" style="width: 75%">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号:" prop="identityCard">
          <el-input v-model="doctorDetail.identityCard" style="width: 75%"></el-input>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input v-model.number="doctorDetail.age" style="width: 75%"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model.number="doctorDetail.phone" style="width: 75%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="doctorDetail.email" style="width: 75%"></el-input>
        </el-form-item>
        <el-form-item label="地址:" prop="location">
          <v-distpicker :province="doctorDetail.location.province" :city="doctorDetail.location.city" :area="doctorDetail.location.area"
                        @selected="onSelected"></v-distpicker>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入详细地址"
            style="width: 75%"
            v-model="doctorDetail.location.locationDetail">
          </el-input>
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
  import VDistpicker from 'v-distpicker'

  var allService = new AllService()
  export default {
    components: { VDistpicker },
    data () {
      return {
        rules: {
          age: [{
            message: '年龄不能为空'
          },
            {
              type: 'number',
              message: '年龄必须为数字值'
            }],
          gender:[{
            message: '请选择性别',
            trigger: 'change'
          }],
          identityCard:[{
            message: '请输入身份证号码',
            trigger: 'blur'
          },{
            pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确'
          }],
          email:[{
            message: '请输入邮箱',
            trigger: 'blur'
          },{
            pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '你的邮箱格式不正确'
          }],
          phone:[{
            message: '请输入手机号',
            trigger: 'blur'
          },{
            pattern:/^1[3|4|5|7|8][0-9]\d{8}$/, message: '你的手机号格式不正确'
          }],
        },
        multipleSelection: [],
        doctorTable: [],
        doctorTableLength: 0,
        dialogVisible: {
          addVisible: false,
          addSingleVisible: false,
          qualifySingleVisible: false,
          modifySingleVisible: false,
          deleteSingleVisible: false,
          timeSlotVisible: false
        },
        qualificationDetail:{
          qualificationId:'',
          // doctorName: '',
          qualification:{

            position:{
              positionId:'',
              positionName:'',
            },
            isConfirmed:'',
          },
          imageUrl:'',
          positionId:'',
          hospitalId:'',
        },
        doctorDetail: {
          doctorName: '',
          gender: '',
          age:'',
          identityCard: '',
          phone: '',
          email: '',
          locationId:'',
          location: {
            province: '江苏省',
            city: '苏州市',
            area: '姑苏区',
            locationDetail:'',
            areaCode: ''
          },
          departId: '',
          depart: {
            departId: '',
            departName: '',
          },
          // deleteTimes: '',
          // deleteDate: '',
        },
        doctorToAdd:{
          doctorName: '',
          departId: '',
          phone: '',
          email: '',
          // deleteTimes: '',
          // deleteDate: '',
        },
        timeSlotList: [],
        selectDepart: {
          departId: '',
        },
        searchKey: '用户名',
        searchContent: '',
        depart:{
          departId:'',
          departName:''
        },
        departTable: [],
        currentPage: 1,
        pageSize: 10,
        multipleSelection: [],
        genderOptions:[{
          value: '男',
          label: '男'
        },{
          value: '女',
          label: '女'
        }],
        qualificationOptions:[{
          value: 1,
          label: '认证通过'
        },{
          value: 0,
          label: '认证失败',
        },{
          value: 2,
          label: '未认证',
          disabled: true
        }],
        images: [
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
          // '../../../assets/1.jpg',
          // '../../../assets/2.jpg',
          // '../../../assets/3.jpg',
        ],
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
      updateQualification () {
        var params = {
          qualificationId: this.qualificationDetail.qualification.qualificationId,
          isConfirmed: this.qualificationDetail.qualification.isConfirmed
        }
        console.log('params')
        console.log(params)
        allService.updateQualificationByQualificationId(params, (isOk, data) => {
          if (isOk) {
            this.dialogVisible.qualifySingleVisible = false
            this.$alert('修改成功')
            this.getDoctorTable()
          }
        })
      },
      deleteDoctorBatch () {
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.multipleSelection)
          if (this.multipleSelection.length==0){
            this.$message.warning('未选择用户')
          }else{
            for(var i=0;i<this.multipleSelection.length;i++){
              allService.deleteDoctorById({doctorId: this.multipleSelection[i].doctorId}, (isOk, data) => {
                if (isOk) {
                  this.getDoctorTable()
                }
              })
            }
            this.$message.success('删除成功！')
          }
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
      onSelected(data){
        this.doctorDetail.location.province= data.province.value
        this.doctorDetail.location.city= data.city.value
        this.doctorDetail.location.area= data.area.value
        this.doctorDetail.location.areaCode = data.area.code
      },
      updateDoctorAllData () {
        allService.updateDoctorAllData(this.doctorDetail, (isOk, data) => {
          if (isOk) {
            var params={
              province: this.doctorDetail.location.province,
              city: this.doctorDetail.location.city,
              area: this.doctorDetail.location.area,
              locationDetail: this.doctorDetail.location.locationDetail,
              areaCode: this.doctorDetail.location.areaCode,
              locationId:this.doctorDetail.locationId,
            }
            allService.updateLocationByLocationId(params, (isOk, data) => {
              if (isOk) {
                this.dialogVisible.modifySingleVisible = false
                this.$alert('修改成功')
                this.getDoctorTable()
              }
            })
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
        if (arg === 'add') {
          this.dialogVisible.addSingleVisible = true
        }
      },
      showQualifyDialog(row) {
        console.log(row)
        this.qualificationDetail = JSON.parse(JSON.stringify(row))//deep copy
        console.log('qualification')
        console.log(this.qualificationDetail)
        console.log(this.doctorDetail.depart.departName)
        this.dialogVisible.qualifySingleVisible = true
      },
      showModifyDialog (row) {
        console.log(row)
        this.doctorDetail = JSON.parse(JSON.stringify(row))//deep copy
        console.log('doctorDetail')
        console.log(this.doctorDetail)

        this.dialogVisible.modifySingleVisible = true
      },
      closeDialog (arg) {
        if (arg === 'modify') {
          this.dialogVisible.modifySingleVisible = false
        }
        if (arg === 'qualify') {
          this.dialogVisible.qualifySingleVisible = false
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
      confirmedFormatter(row){
        console.log(row)
        if(row.qualification.isConfirmed===2){
          return '暂未认证';
        }else if (row.qualification.isConfirmed===1) {
          return '认证通过';
        } else {
          return '认证失败';
        }
      },
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
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
