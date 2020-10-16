export const menus = [
  {
    icon: 'icon-gongzuotai',
    label: '工作台',
    title: '工作台',
    path: '/backend',
  },
  {
    divider: true,
    id: '1',
  },
  {
    icon: 'icon-wenzhang',
    label: '所有文章',
    title: '所有文章',
    path: '/backend/article',
  },
  {
    icon: 'icon-fenlei',
    label: '分类管理',
    title: '分类管理',
    path: '/backend/article/category',
    ignore: true,
  },
  {
    icon: 'icon-biaoqian',
    label: '标签管理',
    title: '标签管理',
    path: '/backend/article/tags',
    ignore: true,
  },
  {
    divider: true,
    id: '2',
  },
  {
    icon: 'icon-pinglun',
    label: '评论管理',
    title: '评论管理',
    path: '/backend/comment',
    ignore: true,
  },
  {
    icon: 'icon-email',
    label: '邮件管理',
    title: '邮件管理',
    path: '/backend/email',
    ignore: true,
  },
  {
    divider: true,
    id: '3',
  },
  {
    icon: 'icon-search',
    label: '搜索记录',
    title: '搜索记录',
    path: '/backend/search',
  },
  {
    icon: 'icon-fangwenliang',
    label: '访问统计',
    title: '访问统计',
    path: '/backend/view',
  },
  {
    divider: true,
    id: '4'
  },
  {
    label: '个人中心',
    title: '个人中心',
    icon: 'icon-geren',
    path: '/backend/ownspace',
    ignore: true,
  },
]