$.ajaxPrefilter(function (config){
  //将key=value形式的数据，转成json格式的字符串
  const foemat2Json = (source)=>{
    let target = {}
    source.split('&').forEach((el)=>{
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
  }

  //统一设置基准网址
  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
  //统一设置请求头
  config.contentType = 'application/json'
  //统一设置请求参数 -post 请求
  config.data = foemat2Json(config.data)

})