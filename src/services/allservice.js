export default class AllService {
  constructor () {
    this.host = process.env.testHost
    this.fileHost = process.env.fileHost
    this.method = {
      // signIn: '/user/signIn',
      signUp: '/user/signUp',
      // getOrderDetailByStudentId: '/order/findByStudentId',
      // getOrderDetailByTeacherId: '/order/findByTeacherId',
      // getTimeSlotDetail: '/timeSlot/find',
      // getTimeSlotByTeacherId: '/timeSlot/findByTeacherId',
      // deleteOrder: '/order/delete',
      // addTimeSlot: '/timeslot/add',
      // deleteTimeSlotById: '/timeSlot/delete',
      // getTeacherTable: '/teacher/findAllTeacher',
      // addOrder: '/order/add',
      // addMessage: '/message/add',
      // deleteMessage: '/message/delete',
      // getTeacherByName: '/teacher/findTeacherByName',
      // getAllDepart: '/depart/findAll',
      // getAllMessage: '/message/findAll',
      // updateStudent:'/student/updateAll',
      // updateTeacher:'/teacher/updateAll',
      // updatePassword:'/user/changePassword',
      // getUserInfo:'/user/findByUserId',
      // getStudentDetailBN: '/student/findStudentByName',
      // getTeacherDetailBN: '/teacher/findTeacherByName',
      // updateStudentImage: '/student/updateImage',
      // updateTeacherImage: '/teacher/updateImage',
      // getStudentDetailById: '/student/findStudentById',
      // getTeacherDetailById: '/teacher/findTeacherById',
      // blurSearchTeacher: '/teacher/findTeacherVague',
      // searchTeacherByDepart: '/teacher/findTeacherByDepart',
      // checkUserName: '/user/checkUserName',
      // getAllStudent: '/student/findAll',
      // deleteStudentByDepart: '/student/deleteByDepart',
      // deleteAllStudent: '/student/deleteAll',
      // searchStudentByDepart: '/student/findStudentByDepart',
      // deleteStudentById: '/student/deleteStudent',
      // addStudent: '/student/addStudent',
      // getAllTeacher: '/teacher/findAllTeacher',
      // deleteAllTeacher: '/teacher/deleteAll',
      // deleteTeacherByDepart: '/teacher/deleteByDepart',
      // addTeacher: '/teacher/addTeacher',
      // deleteTeacherById: '/teacher/deleteTeacher',
      //
      // getAllOrder: '/order/findAllOrder',
      // // deleteAllOrder: '',
      // deleteOrderList: '/order/deleteByList',
      // getOrderDetailBS: '/order/findBySN',
      // getOrderDetailBT: '/order/findByTN',
      // updateOrderDetail: '/order/update',
      //
      // addDepart: '/depart/addDepart'
    }
  }

  ajaxRequest (url, sendData, type, callback, contentType) {
    var result
    $.ajax({
      url: url,
      type: type || 'GET',
      contentType: contentType === undefined ? 'application/x-www-form-urlencoded' : contentType,
      data: contentType == 'application/json' ? JSON.stringify(sendData) : sendData,
      timeout: 60000,
      complete: function () {},
      success: function (data, textStatus) {
        try {
          if (callback) {
            callback(null, data)
          }
          result = data
        } catch (e) {
          console.log(e)
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        try {
          if (callback) {
            callback(textStatus || new Error(FDPX.MSG.NET_ERROR), XMLHttpRequest)
          }
        } catch (e) {
          console.log(e)
        }
      }
    })
    return result
  }

  bizRequest (url, sendData, type, callback, contentType) {
    var result = null
    this.ajaxRequest(url, sendData, type, function (err, data) {
      if (!err) {
        if (data) {
          //成功，更新token
          if (data.status == true || data.status == '200') {
            result = data
            data.status = true
          }
          if (data.status == false || data.status !== '200') {
            console.log(data && data.message ? data.message : FDPX.MSG.NET_NO_DATA)
          }
          if (callback) {
            callback(data.status, data)
          }
        } else {
          if (callback) {
            callback(false, {message: '服务器好像出现了点问题'})
          }
        }
      } else {
        console.log('bizRequest error : ' + err)
      }
    }, contentType)
    return result
  }

  // signIn(params, callback) {
  //   var url = this.host + this.method.signIn;
  //   var type = 'post';
  //   return this.bizRequest(url, params, type, function(isOk, data) {
  //     if (callback) {
  //       callback(isOk, data);
  //     }
  //   }, "application/json");
  // }

  signUp(params, callback) {
    var url = this.host + this.method.signUp;
    var type = 'post';
    return this.bizRequest(url, params, type, function(isOk, data) {
      if (callback) {
        callback(isOk, data);
      }
    }, "application/json");
  }

//   getOrderDetailByStudentId(params, callback){
//     var url = this.host + this.method.getOrderDetailByStudentId;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//
//   getOrderDetailByTeacherId(params, callback){
//     var url = this.host + this.method.getOrderDetailByTeacherId;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getTimeSlotDetail(params, callback){
//     var url = this.host + this.method.getTimeSlotDetail;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getTimeSlotByTeacherId(params, callback){
//     var url = this.host + this.method.getTimeSlotByTeacherId;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteOrder(params,callback){
//     var url = this.host + this.method.deleteOrder;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   addTimeSlot(params,callback){
//     var url = this.host + this.method.addTimeSlot;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteTimeSlotById(params,callback){
//     var url = this.host + this.method.deleteTimeSlotById;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getTeacherTable(params,callback){
//     var url = this.host + this.method.getTeacherTable;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   addOrder(params,callback){
//     var url = this.host + this.method.addOrder;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getAllMessage(params,callback){
//     var url = this.host + this.method.getAllMessage;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   addMessage(params,callback){
//     var url = this.host + this.method.addMessage;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   updatePassword(params,callback){
//     var url = this.host + this.method.updatePassword;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   updateStudent(params,callback){
//     var url = this.host + this.method.updateStudent;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   updateTeacher(params,callback){
//     var url = this.host + this.method.updateTeacher;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//
//   getUserInfo(params,callback){
//     var url = this.host + this.method.getUserInfo;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   updateStudentImage(params,callback){
//     var url = this.host + this.method.updateStudentImage;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   updateTeacherImage(params,callback){
//     var url = this.host + this.method.updateTeacherImage;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getTeacherByName(params,callback){
//     var url = this.host + this.method.getTeacherByName;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   blurSearchTeacher(params,callback){
//     var url = this.host + this.method.blurSearchTeacher;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   searchTeacherByDepart(params,callback){
//     var url = this.host + this.method.searchTeacherByDepart;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getAllDepart(params,callback){
//     var url = this.host + this.method.getAllDepart;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getStudentDetailBN(params,callback){
//     var url = this.host + this.method.getStudentDetailBN;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getTeacherDetailBN(params,callback){
//     var url = this.host + this.method.getTeacherDetailBN;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getStudentDetailById(params,callback){
//     var url = this.host + this.method.getStudentDetailById;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   checkUserName(params,callback){
//     var url = this.host + this.method.checkUserName;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getTeacherDetailById(params,callback){
//     var url = this.host + this.method.getTeacherDetailById;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteMessage(params,callback){
//     var url = this.host + this.method.deleteMessage;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getAllStudent(params,callback){
//     var url = this.host + this.method.getAllStudent;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteStudentByDepart(params,callback){
//     var url = this.host + this.method.deleteStudentByDepart;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteAllStudent(params,callback){
//     var url = this.host + this.method.deleteAllStudent;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   searchStudentByDepart(params,callback){
//     var url = this.host + this.method.searchStudentByDepart;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteStudentById(params,callback){
//     var url = this.host + this.method.deleteStudentById;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   addStudent(params,callback){
//     var url = this.host + this.method.addStudent;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getAllTeacher(params,callback){
//     var url = this.host + this.method.getAllTeacher;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteAllTeacher(params,callback){
//     var url = this.host + this.method.deleteAllTeacher;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteTeacherByDepart(params,callback){
//     var url = this.host + this.method.deleteTeacherByDepart;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   addTeacher(params,callback){
//     var url = this.host + this.method.addTeacher;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//
//   deleteTeacherById(params,callback){
//     var url = this.host + this.method.deleteTeacherById;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//
//   getAllOrder(params,callback){
//     var url = this.host + this.method.getAllOrder;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   deleteOrderList(params,callback){
//     var url = this.host + this.method.deleteOrderList;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//     if (callback) {
//     callback(isOk, data);
//   }
// }, "application/json");
// }
//   getOrderDetailBS(params,callback){
//     var url = this.host + this.method.getOrderDetailBS;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   getOrderDetailBT(params,callback){
//     var url = this.host + this.method.getOrderDetailBT;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   updateOrderDetail(params,callback){
//     var url = this.host + this.method.updateOrderDetail;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
//   addDepart(params,callback){
//     var url = this.host + this.method.addDepart;
//     var type = 'post';
//     return this.bizRequest(url, params, type, function(isOk, data) {
//       if (callback) {
//         callback(isOk, data);
//       }
//     }, "application/json");
//   }
}
