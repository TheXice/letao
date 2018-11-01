// 调用进度条方法

// 开启进度条
//NProgress.start();
//
//setTimeout(function() {
//  // 结束进度条
//  NProgress.done();
//}, 1000);



// ajax 全局事件
// 需求: (1) 在 ajax 开始发送的时候, 开启进度条,
//       (2) 在 所有的 ajax 请求结束时, 结束进度条


// .ajaxComplete() 这个事件将在每个 ajax 完成时调用  (不管成功还是失败, 都会调用)
// .ajaxSuccess()  在每个 ajax 成功时调用
// .ajaxError()    将在每个 ajax 失败时调用
// .ajaxSend()     在每个 ajax 发送前调用

// .ajaxStart()    在第一个 ajax 开始发送时调用
// .ajaxStop()     在所有的 ajax 请求完成后调用
$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();

  }, 500)
})

$(function(){
  $('.cat').on("click",function (){
    $(this).next().stop().slideToggle()
  });
$(".top_menu").on('click',function(){
  $('.left_aside').toggleClass('hidemenu' );
  $('.right_main').toggleClass('hidemenu ');
  $('.top_bar').toggleClass('hidemenu ');
})



})

//模态框
$(function(){
  $('.top_loginout').on('click',function(){
    // 显示模态框
    $('#loginout').modal('show');
  });
  $('#out').on('click',function(){
    $.ajax({
      url:"/employee/employeeLogout",
      type:"get",
      dataType:"json",
      success:function(info){
          console.log(info);
          if(info.success){
          location.href = "login.html";
          }
      }
    })
  })
})