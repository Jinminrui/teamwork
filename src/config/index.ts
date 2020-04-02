export const storyWorkflow = [
  {
    name: '需求制定',
    addable: true,
  },
  {
    name: '开发中',
    addable: false,
  },
  {
    name: '测试中',
    addable: false,
  },
  {
    name: '已上线',
    addable: false,
  },
  {
    name: '已完成',
    addable: false,
  },
];

export const bugWorkflow = [
  {
    name: '待处理',
    addable: true,
  },
  {
    name: '重新打开',
    addable: true,
  },
  {
    name: '修复中',
    addable: false,
  },
  {
    name: '已解决',
    addable: false,
  },
  {
    name: '已拒绝',
    addable: false,
  },
  {
    name: '关闭',
    addable: false,
  },
];


export const priorityColorMap = new Map([
  [1, '#0891e7'],
  [2, '#f98028'],
  [3, '#e1201a'],
]);

export const priorityDescMap = new Map([
  [1, '普通'],
  [2, '紧急'],
  [3, '非常紧急'],
]);

export const storyPointsOptions = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];
