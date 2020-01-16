/* eslint-disable no-undef */

/**
 * 用户登录
 */
post('user/login').to.json({
  code: 200,
  data: {
    token: 'user-token',
  },
  desc: 'success',
});

/**
 * 用户信息
 */
get('/user/info').to.mock({
  code: 200,
  data: {
    id: '@increment',
    username: '@name',
    email: '@email',
    phone: '17314976003',
    avatarUrl:
      'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    gender: 0,
    position: '前端开发工程师',
    description: '海纳百川，有容乃大',
    role: 1,
    teamId: 1,
    createTime: '@date',
  },
  desc: 'success',
});

/**
 * 获取团队成员列表
 */
get('/team/memberList/:id').to.mock({
  code: 200,
  data: {
    'list|3-8': [
      {
        id: '@increment',
        name: '@name',
        avatarUrl:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      },
    ],
  },
  desc: 'success',
});

/**
 * 获取项目列表
 */
get('/project/list').to.mock({
  code: 200,
  data: {
    'list|4': [
      {
        id: '@increment',
        title: '毕业设计',
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        createTime: '@date',
        updateTime: '@date',
      },
    ],
    total: 4,
  },
  desc: 'success',
});

/**
 * 获取文章列表
 */
get('/article/list').to.mock({
  code: 200,
  data: {
    'list|10': [
      {
        id: '@increment',
        title: 'Vue从入门到React',
        description: '@cparagraph(3,5)',
        tag: ['技术分享'],
        authorId: 1,
        authorName: 'Keen King',
        authorAvatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        'star|1-100': 100,
        'like|1-100': 100,
        'comment|1-100': 100,
        updateTime: '@datetime("yyyy-MM-dd HH:mm")',
      },
    ],
    total: 10,
  },
});

/**
 * 获取最新动态
 */
get('/getLatestActivities');
