<template>
  <div style="margin-top: 0px">
    <el-container style="margin: 0px">
      <el-aside width="32%">
        <div>
          <el-row>
            <div class="img-div">
              <img class="user-img" src="../../../assets/logo.png"/>
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
              欢迎注册共享医生
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
  import AllService from '../../../services/allservice.js'
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
              // LOCWIN.Cache.set("userName", params.userName);
              // LOCWIN.Cache.set("userInfo", data.data);
              // LOCWIN.Cache.set("userPass", params.password);
              if (data.data === 'root') {
                this.$message.success("登录成功！")
                // this.$router.push('/SU/index');
              }
              if ("patientId" in data.data) {
                this.$message.success("登录成功！")
                this.$router.push('/login')
                // this.$router.push('/student/index');
              }
              if ("doctorId" in data.data) {
                this.$message.success("登录成功！")
                // this.$router.push('/teacher/index');
              }
              this.$message.success("登录成功！");
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

<!--<template>-->
  <!--<div>-->
    <!--<el-row>-->
      <!--<el-col :span="4">-->
        <!--<el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">-->
          <!--<el-button slot="append" icon="el-icon-search" @click="search"></el-button>-->
        <!--</el-input>-->
      <!--</el-col>-->
      <!--<el-col :span="2">-->
        <!--<el-select v-model="searchKey" placeholder="请选择">-->
          <!--<el-option label="学生名" value="学生名"></el-option>-->
          <!--<el-option label="教师名" value="教师名"></el-option>-->
        <!--</el-select>-->
      <!--</el-col>-->
      <!--<el-col :span="2">-->
        <!--<el-button @click="resetOrderPage">重置</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="2" :offset="2">-->
        <!--<el-button type="primary" @click="showDialog('add')">新增预约</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="2" :offset="1">-->
        <!--<el-button type="primary" @click="showDialog('detailDepart')">查看院系</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="2" :offset="1">-->
        <!--<el-button type="primary" @click="showDialog('addDepartVisible')">新增院系</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="3" :offset="1">-->
        <!--<el-upload-->
          <!--class="upload-demo"-->
          <!--action="http://localhost:3344/depart/addFromExcel"-->
          <!--:on-success="handleAvatarSuccess"-->
          <!--:before-upload="beforeAvatarUpload"-->
          <!--multiple-->
          <!--:show-file-list="false">-->
          <!--<el-button type="primary">从文件新增院系</el-button>-->
        <!--</el-upload>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row>-->
      <!--<el-table-->
        <!--align="left"-->
        <!--:data="orderTable"-->
        <!--border-->
        <!--stripe-->
        <!--highlight-current-row-->
        <!--style="width: fit-content;margin-top: 40px"-->
        <!--empty-text="暂无预约情况">-->
        <!--<el-table-column-->
          <!--prop="studentName"-->
          <!--label="学生姓名"-->
          <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="teacherName"-->
          <!--label="教师姓名"-->
          <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="startTime"-->
          <!--label="开始时间"-->
          <!--width="180"-->
          <!--:formatter="timeFormatter">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="endTime"-->
          <!--label="结束时间"-->
          <!--width="180"-->
          <!--:formatter="timeFormatter">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="操作"-->
          <!--width="220">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button-->
              <!--size="small"-->
              <!--type="warning"-->
              <!--@click="showModifyDialog(scope.row)">修改信息-->
            <!--</el-button>-->
            <!--<el-button-->
              <!--size="small"-->
              <!--type="danger"-->
              <!--@click="deleteSingleOrder(scope.row)">删除预约-->
            <!--</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</el-row>-->
    <!--<el-row style="margin-top: 30px">-->
      <!--<el-col :span="4">-->
        <!--<el-button-->
          <!--size="small"-->
          <!--type="danger"-->
          <!--style="float:left;"-->
          <!--@click="deleteOrderList()">删除以上预约-->
        <!--</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="20">-->
        <!--<el-pagination-->
          <!--@size-change="handleSizeChange"-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page="currentPage"-->
          <!--:page-sizes="[5,10,15]"-->
          <!--:page-size="pageSize"-->
          <!--layout="total, sizes, prev, pager, next, jumper"-->
          <!--:total="orderTableLength"-->
          <!--style="margin-right: 0%;">-->
        <!--</el-pagination>-->
      <!--</el-col>-->

    <!--</el-row>-->

    <!--&lt;!&ndash;修改信息&ndash;&gt;-->
    <!--<el-dialog :title="'修改信息'" :visible.sync="dialogVisible.modifySingleVisible" width="40%">-->
      <!--<el-form :model="orderDetail" label-width="30%">-->
        <!--<el-form-item label="学生姓名" prop="orderDetail.student.studentId">-->
          <!--<el-select v-model="orderDetail.student.studentId" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in studentList"-->
              <!--:key="item.studentId"-->
              <!--:label="item.studentName"-->
              <!--:value="item.studentId">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="教师姓名" prop="orderDetail.teacher.teacherId">-->
          <!--<el-select v-model="orderDetail.teacher.teacherId" placeholder="请选择" @change="getTimeSlotTable">-->
            <!--<el-option-->
              <!--v-for="item in teacherList"-->
              <!--:key="item.teacherId"-->
              <!--:label="item.teacherName"-->
              <!--:value="item.teacherId">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="时间段" prop="orderDetail.timeSlot.timeId">-->
          <!--<el-select v-model="orderDetail.timeSlot.timeId" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in timeSlotList"-->
              <!--:key="item.id"-->
              <!--:label="labelFormatter(item.startTime,item.endTime)"-->
              <!--:value="item.id">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="closeDialog('modify')">取消</el-button>-->
        <!--<el-button @click="updateOrderDetail" type="primary">确定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
    <!--&lt;!&ndash;新增一个&ndash;&gt;-->
    <!--<el-dialog :title="'新增预约'" :visible.sync="dialogVisible.addSingleVisible" width="40%">-->
      <!--<el-form :model="orderToAdd" label-width="30%">-->
        <!--<el-form-item label="学生姓名" prop="orderToAdd.student.studentId">-->
          <!--<el-select v-model="orderToAdd.student.studentId" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in studentList"-->
              <!--:key="item.studentId"-->
              <!--:label="item.studentName"-->
              <!--:value="item.studentId">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="教师姓名" prop="orderToAdd.teacher.teacherId">-->
          <!--<el-select v-model="orderToAdd.teacher.teacherId" placeholder="请选择" @change="getTimeSlotTable">-->
            <!--<el-option-->
              <!--v-for="item in teacherList"-->
              <!--:key="item.teacherId"-->
              <!--:label="item.teacherName"-->
              <!--:value="item.teacherId">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="时间段" prop="orderToAdd.timeSlot.timeId">-->
          <!--<el-select v-model="orderToAdd.timeSlot.timeId" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in timeSlotList"-->
              <!--:key="item.id"-->
              <!--:label="labelFormatter(item.startTime,item.endTime)"-->
              <!--:value="item.id">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="closeDialog('add')">取消</el-button>-->
        <!--<el-button @click="addSingleOrder" type="primary">确定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
    <!--&lt;!&ndash;新增院系&ndash;&gt;-->
    <!--<el-dialog :title="'新增院系'" :visible.sync="dialogVisible.addDepartVisible">-->
      <!--<el-form :model="departToAdd" label-width="100px">-->
        <!--<el-form-item label="院系名" prop="departName">-->
          <!--<el-input v-model="departToAdd.departName" style="width: 60%"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button @click="closeDialog('addDepart')">取消</el-button>-->
          <!--<el-button @click="addDepart" type="primary">添加</el-button>-->
        <!--</span>-->
    <!--</el-dialog>-->
    <!--&lt;!&ndash;查看所有院系&ndash;&gt;-->
    <!--<el-dialog :title="'院系详情'" :visible.sync="dialogVisible.detailDepart" center>-->
      <!--<el-table :data="departTable" border style="width: 70%;margin:auto auto">-->
        <!--<el-table-column property="departId" label="院系Id"></el-table-column>-->
        <!--<el-table-column property="departName" label="院系名"></el-table-column>-->
      <!--</el-table>-->
    <!--</el-dialog>-->
  <!--</div>-->

<!--</template>-->

<!--<script>-->
  <!--import AllService from '../../../services/allservice.js'-->

  <!--var allService = new AllService()-->
  <!--export default {-->
    <!--data () {-->
      <!--return {-->
        <!--orderTable: [],-->
        <!--orderTableLength: 0,-->
        <!--dialogVisible: {-->
          <!--deleteVisible: false,-->
          <!--addVisible: false,-->
          <!--addSingleVisible: false,-->
          <!--modifySingleVisible: false,-->
          <!--deleteSingleVisible: false,-->
          <!--addDepartVisible: false,-->
          <!--detailDepart: false-->
        <!--},-->
        <!--orderDetail: {-->
          <!--id: '',-->
          <!--student: {-->
            <!--studentId: '',-->
            <!--studentName: '',-->
          <!--},-->
          <!--teacher: {-->
            <!--teacherId: '',-->
            <!--teacherName: '',-->
          <!--},-->
          <!--timeSlot: {-->
            <!--timeId: '',-->
            <!--startTime: '',-->
            <!--endTime: ''-->
          <!--},-->
        <!--},-->
        <!--orderToAdd: {-->
          <!--id: '',-->
          <!--student: {-->
            <!--studentId: '',-->
            <!--studentName: '',-->
          <!--},-->
          <!--teacher: {-->
            <!--teacherId: '',-->
            <!--teacherName: '',-->
          <!--},-->
          <!--timeSlot: {-->
            <!--timeId: '',-->
            <!--startTime: '',-->
            <!--endTime: ''-->
          <!--},-->
        <!--},-->
        <!--searchKey: '学生名',-->
        <!--searchContent: '',-->

        <!--studentList: [],-->
        <!--teacherList: [],-->
        <!--timeSlotList: [],-->

        <!--departTable: [],-->
        <!--currentPage: 1,-->
        <!--pageSize: 10,-->
        <!--departToAdd: {-->
          <!--departName: '',-->
        <!--},-->
      <!--}-->
    <!--},-->
    <!--created () {-->
      <!--this.getDepartTable()-->
      <!--this.initpage()-->
    <!--},-->
    <!--methods: {-->
      <!--initpage () {-->
        <!--this.getOrderTable()-->
        <!--this.getStudentTable()-->
        <!--this.getTeacherTable()-->
      <!--},-->
      <!--getStudentTable () {-->
        <!--var params = {-->
          <!--pageNum: 1,-->
          <!--pageSize: 100-->
        <!--}-->
        <!--allService.getAllStudent(params, (isOk, data) => {-->
          <!--if (isOk) {-->
            <!--this.studentList = data.data-->
          <!--}-->

        <!--})-->
      <!--},-->
      <!--getTeacherTable () {-->
        <!--var params = {-->
          <!--pageNum: 1,-->
          <!--pageSize: 100-->
        <!--}-->
        <!--allService.getAllTeacher(params, (isOk, data) => {-->
          <!--if (isOk) {-->
            <!--this.teacherList = data.data-->
          <!--}-->

        <!--})-->
      <!--},-->
      <!--getTimeSlotTable (teacherId) {-->
        <!--allService.getTimeSlotByTeacherId({teacherId: teacherId}, (isOk, data) => {-->
          <!--this.timeSlotList = data.data-->
        <!--})-->
      <!--},-->
      <!--getOrderTable () {-->
        <!--var params = {-->
          <!--pageNum: this.currentPage,-->
          <!--pageSize: this.pageSize-->
        <!--}-->
        <!--allService.getAllOrder(params, (isOk, data) => {-->
          <!--if (isOk) {-->
            <!--this.orderTable = data.data-->
            <!--this.orderTableLength = data.total-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--getDepartTable () {-->
        <!--allService.getAllDepart({}, (isOk, data) => {-->
          <!--if (isOk) {-->
            <!--this.departTable = data.data-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--deleteOrderList () {-->
        <!--this.$confirm('确定要删除吗？', '提示', {-->
          <!--confirmButtonText: '确定',-->
          <!--cancelButtonText: '取消',-->
          <!--type: 'warning'-->
        <!--}).then(() => {-->
          <!--this.orderTable-->
          <!--var params = []-->
          <!--for (var order of this.orderTable) {-->
            <!--params.push({id: order.id, timeId: order.timeId})-->
          <!--}-->
          <!--console.log(params)-->
          <!--allService.deleteOrderList(params, (isOk, data) => {-->
            <!--if (isOk) {-->
              <!--this.$alert('删除成功')-->
              <!--this.getOrderTable()-->
            <!--}-->
          <!--})-->
        <!--})-->
      <!--},-->
      <!--addSingleOrder () {-->
        <!--var params = {-->
          <!--id: this.orderToAdd.id,-->
          <!--studentId: this.orderToAdd.student.studentId,-->
          <!--teacherId: this.orderToAdd.teacher.teacherId,-->
          <!--timeId: this.orderToAdd.timeSlot.timeId-->
        <!--}-->
        <!--allService.addOrder(params, (isOk, data) => {-->
          <!--if (data.message !== 'error') {-->
            <!--this.$message.success('新增成功')-->
            <!--this.closeDialog('add')-->
            <!--this.getOrderTable()-->
          <!--} else {-->
            <!--this.$message.error(data.data)-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--search () {-->
        <!--if (this.searchContent === null || this.searchContent === '') {-->
          <!--this.getOrderTable()-->
        <!--}-->
        <!--else if (this.searchKey === '学生名') {-->
          <!--var params1 = {-->
            <!--studentName: this.searchContent,-->
            <!--pageNum: this.currentPage,-->
            <!--pageSize: this.pageSize-->
          <!--}-->
          <!--allService.getOrderDetailBS(params1, (isOk, data) => {-->
            <!--if (data.data != null) {-->
              <!--this.orderTable = data.data-->
              <!--this.orderTableLength = data.total-->
            <!--} else {-->
              <!--this.orderTable = []-->
              <!--this.orderTableLength = 0-->
            <!--}-->
          <!--})-->
        <!--}-->
        <!--else if (this.searchKey === '教师名') {-->
          <!--var params2 = {-->
            <!--teacherName: this.searchContent,-->
            <!--pageNum: this.currentPage,-->
            <!--pageSize: this.pageSize-->
          <!--}-->
          <!--allService.getOrderDetailBT(params2, (isOk, data) => {-->
            <!--if (isOk) {-->
              <!--this.orderTable = data.data-->
              <!--this.orderTableLength = data.total-->
            <!--}-->
          <!--})-->
        <!--}-->
      <!--},-->
      <!--updateOrderDetail () {-->
        <!--var params = {-->
          <!--id: this.orderDetail.id,-->
          <!--timeId: this.orderDetail.timeSlot.timeId,-->
          <!--teacherId: this.orderDetail.teacher.teacherId,-->
          <!--studentId: this.orderDetail.student.studentId-->
        <!--}-->
        <!--allService.updateOrderDetail(params, (isOk, data) => {-->
          <!--if (isOk) {-->
            <!--this.dialogVisible.modifySingleVisible = false-->
            <!--this.$alert('修改成功')-->
            <!--this.getOrderTable()-->
          <!--}-->
        <!--})-->

      <!--},-->
      <!--deleteSingleOrder (row) {-->
        <!--console.log(row)-->
        <!--this.$confirm('确定要删除吗？', '提示', {-->
          <!--confirmButtonText: '确定',-->
          <!--cancelButtonText: '取消',-->
          <!--type: 'warning'-->
        <!--}).then(() => {-->
          <!--allService.deleteOrder({id: row.id}, (isOk, data) => {-->
            <!--if (isOk) {-->
              <!--this.getOrderTable()-->
              <!--this.$alert('删除成功')-->
            <!--}-->
          <!--})-->
        <!--})-->

      <!--},-->
      <!--addDepart () {-->
        <!--var params = {-->
          <!--departName: this.departToAdd.departName-->
        <!--}-->
        <!--allService.addDepart(params, (isOk, data) => {-->
          <!--if (isOk) {-->
            <!--this.$alert('添加院系成功')-->
            <!--this.closeDialog('addDepart')-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--resetOrderPage () {-->
        <!--this.getOrderTable()-->
        <!--this.searchKey = '学生名'-->
        <!--this.searchContent = ''-->
      <!--},-->
      <!--handleAvatarSuccess (res, file) {-->
        <!--if(res.message==='error'){-->
          <!--this.$message.error(res.data)-->
        <!--}-->
        <!--else {-->
          <!--this.$alert('上传成功')-->
          <!--this.getDepartTable()-->
        <!--}-->

      <!--},-->
      <!--beforeAvatarUpload (file) {-->
        <!--// console.log(file);-->
        <!--const isJPG = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'-->
        <!--const isLt2M = file.size / 1024 / 1024 < 2-->
        <!--if (!isJPG) {-->
          <!--this.$message.error('上传文件只能是xlxs格式!')-->
        <!--}-->
        <!--if (!isLt2M) {-->
          <!--this.$message.error('上传文件大小不能超过 2MB!')-->
        <!--}-->
        <!--return isJPG && isLt2M-->
      <!--},-->

      <!--showDialog (arg) {-->
        <!--if (arg === 'delete') {-->
          <!--this.dialogVisible.deleteVisible = true-->
        <!--}-->
        <!--if (arg === 'add') {-->
          <!--this.dialogVisible.addSingleVisible = true-->
        <!--}-->
        <!--if (arg === 'detailDepart') {-->
          <!--this.dialogVisible.detailDepart = true-->
          <!--this.getDepartTable()-->
        <!--}-->
        <!--if (arg === 'addDepartVisible') {-->
          <!--this.dialogVisible.addDepartVisible = true-->
        <!--}-->
      <!--},-->
      <!--showModifyDialog (row) {-->
        <!--console.log(row)-->
        <!--var temp = JSON.parse(JSON.stringify(row))-->
        <!--this.orderDetail.id = row.id-->
        <!--this.orderDetail.student.studentId = temp.studentId-->
        <!--this.orderDetail.student.studentName = temp.studentName-->
        <!--this.orderDetail.teacher.teacherId = temp.teacherId-->
        <!--this.orderDetail.teacher.teacherName = temp.teacherName-->
        <!--this.orderDetail.timeSlot.timeId = temp.timeId-->
        <!--this.orderDetail.timeSlot.startTime = temp.startTime-->
        <!--this.orderDetail.timeSlot.endTime = temp.endTime-->
        <!--this.dialogVisible.modifySingleVisible = true-->
        <!--this.getTimeSlotTable(temp.teacherId)-->
      <!--},-->
      <!--closeDialog (arg) {-->
        <!--if (arg === 'delete') {-->
          <!--this.dialogVisible.deleteVisible = false-->
          <!--this.selectDepart.depart = ''-->
        <!--}-->
        <!--if (arg === 'modify') {-->
          <!--this.dialogVisible.modifySingleVisible = false-->
        <!--}-->
        <!--if (arg === 'add') {-->
          <!--this.dialogVisible.addSingleVisible = false-->
        <!--}-->
        <!--if (arg === 'addDepart') {-->
          <!--this.dialogVisible.addDepartVisible = false-->
          <!--this.departToAdd.departName = ''-->
        <!--}-->
      <!--},-->
      <!--labelFormatter (startTime, endTime) {-->
        <!--var startDate = new Date(startTime)-->
        <!--var endDate = new Date(endTime)-->
        <!--var start = this.timeFormat(startDate)-->
        <!--var end = this.timeFormat(endDate)-->
        <!--return start + '~' + end-->
      <!--},-->
      <!--timeFormatter (row, column) {-->
        <!--var date = new Date(row[column.property])-->

        <!--if (date == undefined) {-->
          <!--return ''-->
        <!--}-->
        <!--var y = date.getFullYear()-->
        <!--var m = date.getMonth() + 1-->
        <!--m = m < 10 ? ('0' + m) : m-->
        <!--var d = date.getDate()-->
        <!--d = d < 10 ? ('0' + d) : d-->
        <!--var h = date.getHours()-->
        <!--h = h < 10 ? ('0' + h) : h-->
        <!--var minute = date.getMinutes()-->
        <!--minute = minute < 10 ? ('0' + minute) : minute-->
        <!--var second = date.getSeconds()-->
        <!--second = second < 10 ? ('0' + second) : second-->
        <!--return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second-->
      <!--},-->
      <!--timeFormat (date) {-->
        <!--if (date == undefined) {-->
          <!--return ''-->
        <!--}-->
        <!--var y = date.getFullYear()-->
        <!--var m = date.getMonth() + 1-->
        <!--m = m < 10 ? ('0' + m) : m-->
        <!--var d = date.getDate()-->
        <!--d = d < 10 ? ('0' + d) : d-->
        <!--var h = date.getHours()-->
        <!--h = h < 10 ? ('0' + h) : h-->
        <!--var minute = date.getMinutes()-->
        <!--minute = minute < 10 ? ('0' + minute) : minute-->
        <!--var second = date.getSeconds()-->
        <!--second = second < 10 ? ('0' + second) : second-->
        <!--return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second-->
      <!--},-->
      <!--departFormatter (row) {-->
        <!--var temp = row.departId-->
        <!--for (var i = 0; i < this.departTable.length; i++) {-->
          <!--if (temp === this.departTable[i].departId) {-->
            <!--return this.departTable[i].departName-->
          <!--}-->
        <!--}-->
      <!--},-->
      <!--getDepartId (temp) {-->
        <!--for (var i = 0; i < this.departTable.length; i++) {-->
          <!--if (temp === this.departTable[i].departName) {-->
            <!--return this.departTable[i].departId-->
          <!--}-->
        <!--}-->
      <!--},-->
      <!--handleCurrentChange (val) {-->
        <!--this.currentPage = val-->
        <!--this.search()-->
      <!--},-->
      <!--handleSizeChange (val) {-->
        <!--this.pageSize = val-->
        <!--this.search()-->
      <!--},-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style>-->
  <!--.avatar-uploader .el-upload {-->
    <!--border: 1px dashed #d9d9d9;-->
    <!--border-radius: 6px;-->
    <!--cursor: pointer;-->
    <!--position: relative;-->
    <!--overflow: hidden;-->
  <!--}-->

  <!--.avatar-uploader .el-upload:hover {-->
    <!--border-color: #409EFF;-->
  <!--}-->

  <!--.mysidebar {-->
    <!--transition: width .28s;-->
    <!--width: 250px !important;-->
    <!--height: 100%;-->
    <!--position: fixed;-->
    <!--font-size: 0px;-->
    <!--top: 50px;-->
    <!--bottom: 0;-->
    <!--left: 0;-->
    <!--z-index: 1001;-->
    <!--overflow: hidden;-->
  <!--}-->
<!--</style>-->

<!--<style scoped>-->
  <!--.el-row {-->
    <!--margin-bottom: 0px;-->

  <!--&-->
  <!--:last-child {-->
    <!--margin-bottom: 0;-->
  <!--}-->

  <!--}-->
  <!--.el-col {-->
    <!--border-radius: 4px;-->
  <!--}-->

  <!--.bg-purple-dark {-->
    <!--background: #99a9bf;-->
  <!--}-->

  <!--.bg-purple {-->
    <!--background: #d3dce6;-->
  <!--}-->

  <!--.hello-div {-->
    <!--margin-top: 140px;-->
    <!--text-align: left;-->
    <!--margin-left: 30px;-->
  <!--}-->

  <!--.grid-content {-->
    <!--border-radius: 4px;-->
    <!--min-height: 36px;-->
  <!--}-->

  <!--.row-bg {-->
    <!--padding: 10px 0;-->
    <!--background-color: #f9fafc;-->
  <!--}-->

  <!--.time {-->
    <!--font-size: 13px;-->
    <!--color: #999;-->
  <!--}-->

  <!--.bottom {-->
    <!--margin-top: 13px;-->
    <!--line-height: 12px;-->
  <!--}-->

  <!--.button {-->
    <!--padding: 0;-->
    <!--float: right;-->
  <!--}-->

  <!--.image {-->
    <!--width: 100%;-->
    <!--display: block;-->
  <!--}-->

  <!--.clearfix:before,-->
  <!--.clearfix:after {-->
    <!--display: table;-->
    <!--content: "";-->
  <!--}-->

  <!--.clearfix:after {-->
    <!--clear: both-->
  <!--}-->
<!--</style>-->

<!--<style scoped lang="scss">-->
  <!--.img-div {-->
    <!--width: 100%;-->
    <!--height: 100%;-->

  <!--.user-img {-->
    <!--width: 100%;-->
    <!--height: 100%;-->
  <!--}-->

  <!--}-->
  <!--.container {-->
    <!--position: fixed;-->
    <!--top: 0px;-->
    <!--bottom: 0px;-->
    <!--width: 100%;-->
    <!--height: fit-content;-->
    <!--z-index: 1002;-->

  <!--.topbar-wrap {-->
    <!--height: 50px;-->
    <!--line-height: 50px;-->
    <!--background: #373d41;-->
    <!--padding: 0px;-->

  <!--.topbar-btn {-->
    <!--color: #fff;-->
  <!--}-->

  <!--/*.topbar-btn:hover {*/-->
  <!--/*background-color: #4A5064;*/-->
  <!--/*}*/-->
  <!--.topbar-logo {-->
    <!--float: left;-->
    <!--width: 59px;-->
    <!--line-height: 26px;-->
  <!--}-->

  <!--.topbar-logos {-->
    <!--float: left;-->
    <!--width: 120px;-->
    <!--line-height: 26px;-->
  <!--}-->

  <!--.topbar-logo img, .topbar-logos img {-->
    <!--height: 40px;-->
    <!--margin-top: 5px;-->
    <!--margin-left: 2px;-->
  <!--}-->

  <!--.topbar-title {-->
    <!--float: left;-->
    <!--text-align: left;-->
    <!--width: 200px;-->
    <!--padding-left: 10px;-->
    <!--border-left: 1px solid #000;-->
  <!--}-->

  <!--.topbar-account {-->
    <!--float: right;-->
    <!--padding-right: 12px;-->
  <!--}-->

  <!--.userinfo-inner {-->
    <!--cursor: pointer;-->
    <!--color: #fff;-->
    <!--padding-left: 10px;-->
  <!--}-->

  <!--.input-inner {-->
    <!-- -webkit-appearance: none;-->
    <!--background-color: #fff;-->
    <!--background-image: none;-->
    <!--border-radius: 4px;-->
    <!--border: 1px solid #dcdfe6;-->
    <!--box-sizing: border-box;-->
    <!--color: #606266;-->
    <!--display: inline-block;-->
    <!--font-size: inherit;-->
    <!--height: 40px;-->
    <!--line-height: 40px;-->
    <!--outline: none;-->
    <!--padding: 0 15px;-->
    <!--transition: border-color .2s cubic-bezier(.645, .045, .355, 1);-->
    <!--width: 100%;-->
  <!--}-->

  <!--}-->
  <!--.main {-->
    <!--display: -webkit-box;-->
    <!--display: -webkit-flex;-->
    <!--display: -ms-flexbox;-->
    <!--display: flex;-->
    <!--position: absolute;-->
    <!--top: 50px;-->
    <!--bottom: 0px;-->
    <!--overflow: hidden;-->
  <!--}-->

  <!--aside {-->
    <!--min-width: 50px;-->
    <!--background: #333744;-->

  <!--&-->
  <!--::-webkit-scrollbar {-->
    <!--display: none;-->
  <!--}-->

  <!--&-->
  <!--.showSidebar {-->
    <!--overflow-x: hidden;-->
    <!--overflow-y: auto;-->
  <!--}-->

  <!--.el-menu {-->
    <!--height: 100%; /*写给不支持calc()的浏览器*/-->
    <!--height: -moz-calc(100% - 80px);-->
    <!--height: -webkit-calc(100% - 80px);-->
    <!--height: calc(100% - 80px);-->
    <!--border-radius: 0px;-->
    <!--background-color: #333744;-->
    <!--border-right: 0px;-->
  <!--}-->

  <!--.el-submenu .el-menu-item {-->
    <!--min-width: 60px;-->
  <!--}-->

  <!--.el-menu {-->
    <!--width: 180px;-->
  <!--}-->

  <!--.el-menu&#45;&#45;collapse {-->
    <!--width: 60px;-->
  <!--}-->

  <!--.el-menu .el-menu-item, .el-submenu .el-submenu__title {-->
    <!--height: 46px;-->
    <!--line-height: 46px;-->
  <!--}-->

  <!--.el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {-->
    <!--background-color: #7ed2df;-->
  <!--}-->

  <!--}-->

  <!--.menu-toggle {-->
    <!--background: #4A5064;-->
    <!--text-align: center;-->
    <!--color: white;-->
    <!--height: 26px;-->
    <!--line-height: 30px;-->
  <!--}-->

  <!--.content-container {-->
    <!--background: #fff;-->
    <!--flex: 1;-->
    <!--overflow-y: auto;-->
    <!--padding: 10px;-->
    <!--padding-bottom: 1px;-->

  <!--.content-wrapper {-->
    <!--background-color: #fff;-->
    <!--box-sizing: border-box;-->
  <!--}-->

  <!--}-->
  <!--}-->
<!--</style>-->
