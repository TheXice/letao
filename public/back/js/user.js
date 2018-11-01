$(function(){
  var currentPage= 1;
  var pageSize = 5;
  var currentId;
  var isDelete;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{page:currentPage,pageSize:pageSize},
      dataType:"json",
      success:function(info){
        console.log(info);
        var str = template("tmp",info)
        console.log(str);
        
        $('tbody').html(str)

        //配置页数
        $('#pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,page){
            currentPage= page;
                 render();
          }
        })
      }
    })
  }
  $('tbody').on('click',".btn",function(){
    $("#usermodal").modal('show');
    currentId = $(this).parent().data("id");
    isDelete = $(this).hasClass('btn-danger')?0:1;
  })
  $('#submitbtn').on('click',function(){
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{id:currentId,isDelete:isDelete},
      dataType:"json",
      success:function(info){
          console.log(info);
          $("#usermodal").modal('hide');
          render();
      }

    })
  })
})