$(function () {

  let layer = layui.layer
  getUserInfo()


  $("#btnLogout").on('click',function(){

    // const result = confirm('确定退出吗？')
    // if(result){
    //   localStorage.clear()
    //   location.href = './login.html'
    // }

    layer.confirm('确定退出吗？', {icon: 3, title:'提示'}, function(index){
      //do something
      localStorage.clear()
        location.href = './login.html'
      layer.close(index);
    });

  })



})


function getUserInfo(){
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('big_news_token') || ''
    // },
    success(res) {
      if (res.code !== 0) return layer.msg(res.message)
      if (res.user_pic) {
        $('.text-avatar').hide()
        $(".user-box img").attr('src', res.user_pic).show()
      } else {
        $('.layui-nav-img').hide()
        const name = res.data.nickname||res.data.username
        const char = name[0].toUpperCase()
        $('.text-avatar').attr('display','flex').html(char).show()
      }
      $('.text').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
    },
   
  })


  


}
