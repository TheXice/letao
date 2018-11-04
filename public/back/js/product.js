$(function () {
  var currentPage = 1;
  var pageSize = 2;
  var picArr = [];
  render();

  function render() {
    $.ajax({
      url: "/product/queryProductDetailList",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
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
  $('#btn').on('click', function () {
    $('#addcate').modal('show');
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        var str = template('cate_tmp', info);
        $('.dropdown-menu').html(str);
      }
    })
  })

  //给下拉菜单注册点击事件

  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('#cateText').text(txt);
    var id = $(this).data("id");
    $('[name="brandId"]').val(id);
    $('form').data('bootstrapValidator').updateStatus("brandId", "VALID");
  })

  //配置上传插件
  $('#fileupload').fileupload({
    dataType: "json",
    // 回调函数
    done: function (e, data) {
      var picObj = data.result;
      var picUrl = picObj.picAddr;
      picArr.unshift(picObj);
      console.log(data);
      
      // 将图片路径设置给 img src 并添加到 imgBox的子元素最前面
      $('#imgbox').prepend('<img src="' + picUrl + '" alt="">');
      if ( picArr.length > 3 ) {
        picArr.pop();
        // 只想找 img, 找最后一个 img 类型的元素
        $('#imgbox img:last-of-type').remove();

    }
     // 如果图片上传满了 3 张, 应该让picStatus的校验状态, 置成校验成功
     if ( picArr.length === 3 ) {
      $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
    }

  }
  })

  //表单校验
  $('#form').bootstrapValidator({
    // 配置对隐藏域也进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      // 要求库存必须是非零开头的数字
      num: {
        validators: {
          // 非空校验
          notEmpty: {
            message: "请输入商品库存"
          },
          // 正则校验  \d 表示数字 [0-9]
          // \d 出现 0次或多次
          // * 表示 0 次或多次
          // ? 表示 0 次或1次
          // + 表示 1 次或多次
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '库存格式要求是非零开头的数字'
          }
        }
      },

      // 要求尺码是  xx-xx 的格式,  xx 表示数字
      size: {
        validators: {
          // 非空校验
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式必须是 xx-xx 的格式, 例如: 32-40'
          }
        }
      },

      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },

      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });


  //确认提交
  $('#form').on("success.form.bv", function( e ) {

    e.preventDefault();

    // 拼接需要传给后台的参数
    var params = $('#form').serialize();   // aa=xx&bb=xx

    // params += "&picName1=xx&picAddr1=xx";
    params += "&picName1="+ picArr[0].picName +"&picAddr1=" + picArr[0].picAddr;
    params += "&picName2="+ picArr[1].picName +"&picAddr2=" + picArr[1].picAddr;
    params += "&picName3="+ picArr[2].picName +"&picAddr3=" + picArr[2].picAddr;

    // 通过 ajax 提交
    $.ajax({
      type: "POST",
      url: "/product/addProduct",
      data: params,
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 添加成功
          // 关闭模态框
          $('#addModal').modal("hide");
          // 重新渲染第一页
          currentPage = 1;
          render();
          // 重置模态框的表单内容和状态
          $('#form').data("bootstrapValidator").resetForm(true);
          // 重置文本和图片
          $('#cateText').text("请选择二级分类");
          $('#imgbox img').remove();
        }
      }
    })

  })
})