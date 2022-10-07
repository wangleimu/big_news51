$(function () {
  const layer = layui.layer

  loadCateLost()

  function loadCateLost() {
    $.ajax({
      url: '/my/cate/list',
      success(res) {
        if (res.code !== 0) return layer.msg('获取数据失败')
        const htmlS = template('tpl-cate', res)
        $('tbody').append(htmlS)
      }
    })
  }

  let index = null
  $('#btnAdd').on('click', function () {
    index = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章类别',
      content: $('#dialog-add').html()
    });
  })

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/cate/add',
      data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) return layer.msg('新增分类失败')
        layer.msg('添加成功')
        layer.close(index)
        loadCateLost()
      }
    })
  })


  $('tbody').on('click', '.btnEdit', function () {
    index = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章类别',
      content: $('#dialog-add').html()
    });

    const id = $(this).attr('data-id')
    $.ajax({
      url: `/my/cate/info?id=${id}`,
      success(res) {
        if (res.code !== 0) return layer.msg('获取分类详情失败')
        form.val('addFormFilter', res.data)
      }
    })
  })


  $('tbody').on('click', '.btnDelete', function () {
    const result = confirm('确定删除吗')
    const id = $(this).attr('data-id')
    if (result) {
      $.ajax({
        method: 'DELETE',
        url: `/my/cate/del?id=${id}`,
        success(res) {
          if (res.code !== 0) return layer.msg('删除分类详情失败')
          layer.msg('添加成功')
          loadCateLost()
        }
      })
    }

  })








})