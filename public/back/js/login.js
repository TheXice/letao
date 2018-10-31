$(function () {
  $('#form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定检验的字段
    fields: {
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: "用户名不能为空"
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度为6到12位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度为6到12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  })

  //重置
  $('[type="reset"]').on("click", function () {

    $('#form').data('bootstrapValidator').resetForm();
  })


  $('#form').on('success.form.bv', function (e) {
    //组织事件跳转
    e.preventDefault();

    //ajax请求
    $.ajax({
      url: "/employee/employeeLogin",
      type: "post",
      data: $('form').serialize(),
      dataType: 'json',
      success: function (info) {
          console.log(info);
          if(info.success){
           location.href = "index.html";
          }
          //updateStatus(field, status, validatorName)更新字段
          //status值:- NOT_VALIDATED：未校验的 VALIDATING：校验中的 INVALID ：校验失败的 VALID：校验成功的。
          if(info.error === 1000){
            $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
          }
          if(info.error === 1001){
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
          }
      }
    })
  })
})