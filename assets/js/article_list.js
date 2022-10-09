$(function () {
  const layer = layui.layer
  const form = layui.form
  const laypage = layui.laypage
  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    let y = dt.getFullYear()
    let m = padZero(dt.getMonth() + 1)
    let d = padZero(dt.getDate())

    let hh = padZero(dt.getHours())
    let mm = padZero(dt.getMinutes())
    let ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }
  // 定义一个查询的参数对象，将来请求数据的时候，
  // 需要将请求参数对象提交到服务区
  let qs = {
    pagenum: 1,//当前页码值（表示当前第几页）
    pagesize: 2, //当前每页显示多少
    cate_id: '', //当前选择的文章分类
    state: '' //当前文章所处的状态，可选值：已发布，操作都是字符串类型
  }

  // 加载文章列表
  loadAticleList()
  initCate()
  // 获取文章列表数据方法
  function loadAticleList() {
    $.ajax({
      method: 'GET',
      url: `/my/article/list?pagenum=${qs.pagenum}&pagesize=${qs.pagesize}&cate_id=${qs.cate_id}&state=${qs.state}`,
      data: qs,
      success(res) {
        if (res.code !== 0) return layer.msg('获取文章列表失败')
        // 使用模板引擎渲染页面的数据
        const htmlStr = template('tpl-table', res)
        $('tbody').empty().append(htmlStr)
        // 调用渲染分页的方法

      }
    })
  }

  // 初始化文章分类方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.code !== 0) {
          return layer.msg('获取分类数据失败！')
        }
        // 调用模板引擎渲染分类的可选项
        let htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)

        // 通过layui重新渲染表单区域的UI结构
        form.render()
      }
    })
  }

  // 为筛选表单绑定submit事件
  $('#form-search').on('submit', function (e) {
    e.preventDefault()
    // 获取表单中选项的值
    let cate_id = $('[name=cate_id]').val()
    q.cate_id = cate_id

    let state = $('[name=state]').val()
    q.state = state
    loadAticleList()
  })




  function renderPager(total) {
    laypage.render({
      elem: document.getElementById('pagerWrapper'),
      count: total,
      limit: qs.pagenum,
      curr: qs.pagenum,
      jump(obj, first) {
        console.log(obj.curr, obj.limit),
          qs.pagenum = obj.curr
        qs.pagesize = obj.limit

        if (typeof first === 'undefined') {
          loadAticleList()
        }
      }
    })
  }


  $("tbody").on('click', '.btnDelete', function () {
    const result = confirm('确定删除吗？')
    if (result) {
      const id = $(this).attr('abc')
      $.ajax({
        method: 'DELETE',
        url: `/my/article/info?id=${id}`,
        success(res) {
          if (res.code !== 0) return layer.msg('删除文章')
          layer.msg('删除成功')

          if(len === 1){
            qs.pagenum = qs.pagenum === 1 ? 1 : qs.pagenum - 1
          }
          loadAticleList()
        }
      })
    }
  })


















})