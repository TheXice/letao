$(function () {
  currentPage = 1;
  pageSize = 8;
  render();

  function render() {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
      var str = template('tmp',info)
      $('tbody').html(str);
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

$('#add').on('click',function(){
  $('#addcate').modal('show');
})

$('#form').bootstrapValidator({
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',   // 校验成功
    invalid: 'glyphicon glyphicon-remove',   // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中
  },
  fields: {
    categoryName:{
      validators: {
        notEmpty:{
          message:"请输入一级分类"
        }
      } 
    }
  }
})
$('#form').on('success.form.bv',function(e){
  e.preventDefault();
  $.ajax({
    type:"post",
    url:"/category/addTopCategory",
    data:$('#form').serialize(),
    dataType:"json",
    success:function(info){
      $('#addcate').modal('hide');
      currentPage = 1;
      render();
      $('#form').data("bootstrapValidator").resetForm( true );
    }
  })
})
})