$(function(){
  //从layui中去得form
let form = layui.form
let layer = layui.layer


//点击去注册
$("#go2Reg").on('click',function(){
  $('.login-wrap').hide()
  $('.reg-wrap').show()
})

//点击去登录
$("#go2Login").on('click',function(){
  $('.reg-wrap').hide()
  $('.login-wrap').show()
})



form.verify({
  pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'], 

  repwd: function(value){
    if($("#password").val()!==value){
      return '两次密码不一致，请重新输入'
    }
  }
})


//给注册表单添加提交事件
$("#formReg").on('submit',function(e){
  e.preventDefault()
  $.ajax({
    method:'POST',
    url:'/api/reg',
    data:$(this).serialize(),
    success(res){
      if(res.code !== 0)return layer.msg(res.message)
      layer.msg('注册成功,请登录')
      $("#go2Login").click()
    }
  })
})


//给登录表单添加提交事件
$("#formLogin").on('submit',function(e){
  e.preventDefault()
  $.ajax({
    method:'POST',
    url:'/api/login',
    data:$(this).serialize(),
    success(res){
      if(res.code !== 0)return layer.msg(res.message)
      layer.msg('登录成功')

      localStorage.setItem('big_news_token',res.token)
      location.href = './home.html'
      
    }
  })
})

})