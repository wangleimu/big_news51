$(function(){

  let form = layui.form
  let layer = layui.layer

  form.verify({
    nickname: function (value) {
      if (value.length > 6) return '昵称长度必须在1~6个字符之间'
    }
  })

  initUserInfo()

  function initUserInfo() {
    $.ajax({
      // method: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.code !== 0) return layer.msg('获取用户信息失败')
        console.log(res);
        //调用form.val()快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }
  //重置按钮
  $("#btnReset").on('click', function (e) {
    // 阻止默认提交
    e.preventDefault()
    initUserInfo()

  })

  //监听表单事件
  $(".layui-form").on('submit',function(e){
    // 阻止默认提交
    e.preventDefault()
    $.ajax({
      method:'PUT',
      url:'/my/userinfo',
      data:form.val('formUserInfo'),
      success(res){
        if(res.code !==0)return layer.msg('获取信息失败')
        layer.msg('更新用户信息成功')
        //调用父元素中的渲染函数
      window.parent.getUserInfo()
      }
    })
  })

})