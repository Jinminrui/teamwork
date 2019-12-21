/* eslint-disable no-undef */

/**
 * 用户登录
 */
post('/api/user/login').to.json({
  code: 200,
  data: {
    token: 'user-token',
  },
  desc: 'success',
});

/**
 * 用户信息
 */
get('/api/user/info').to.mock({
  code: 200,
  data: {
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
get('/api/team/memberList/:id').to.mock({
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
get('/api/project/list').to.mock({
  code: 200,
  data: {
    'list|6-8': [
      {
        id: '@increment',
        title: '毕业设计',
        desc: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
      },
    ],
  },
  desc: 'success',
});
