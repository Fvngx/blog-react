export const menus = [
  {
    icon: 'icon-star',
    label: '工作台',
    title: '工作台',
    path: '/backend',
  },
  {
    divider: true,
    id: '1',
  },
  {
    icon: 'icon-star',
    label: '所有文章',
    title: '所有文章',
    path: '/backend/article',
  },
  {
    icon: 'icon-star',
    label: '新建文章',
    title: '新建文章',
    path: '/backend/article/editor',
    ignore: true,
  },
  {
    icon: 'icon-star',
    label: '编辑文章',
    title: '编辑文章',
    path: '/backend/article/editor/[id]',
    ignore: true,
  },
]