$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var str = template('tmp', info);
        $('tbody').html(str);
        $('#pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })


  }


  //显示模态框
  $('#add').on("click", function () {
    $('#addcate').modal("show");
    //请求数据
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var str = template("cate", info)
        $('.dropdown-menu').html(str)
      }

    })
  })

  // 给下拉菜单的a注册点击事件

  $('.dropdown-menu').on('click', 'a', function () {
    // alert(1);
    var txt = $(this).text();
    $('#cateText').text(txt);
    var id = $(this).data("id");
    $('#cateid').val(id);
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });

  //上传插件
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      var picUrl = data.result.picAddr;
      $('#imgbox img').attr('src', picUrl);
      $('[name="brandLogo"]').val(picUrl);
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
    }
  });
  // 5. 表单校验
  $('#form').bootstrapValidator({
    // 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // 对任意配置了的 input 都进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    // 校验字段
    fields: {

      // categoryId 选择一级分类
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }

    }
  });
  // 提交拦截
  // $('#form').on("success.form.bv", function(e){
  //   e.preventDefault();
  // $.ajax({
  //   url:"/category/addSecondCategory",
  //   get:"post",
  //   data:$('form').serialize(),
  //   dataType:"json",
  //   success:function(info){
  //     console.log(info)
  //   if(info.success){
  //     $('#addcate').modal("hide");
  //     currentPage = 1;
  //     render();
  //     $('#form').data("bootstrapValidator").resetForm(true);
  //     $('cateText').text("请选择一级分类");
  //     $('#imgBox img').attr("src", "images/none.png");
  //   }

  //   }
  // })
  // }
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
        url:"/category/addSecondCategory",
        type:"post",
        data:$('form').serialize(),
        dataType:"json",
        success:function(){
          $('#addcate').modal("hide");
              currentPage = 1;
              render();
              $('#form').data("bootstrapValidator").resetForm(true);
              $('cateText').text("请选择一级分类");
              $('#imgBox img').attr("src", "images/none.png");
        }
    })
  })
})