interface WorkFlowConfig {
  name: string;
  addable: boolean;
  tagColor?: string;
}


export const storyWorkflow: WorkFlowConfig[] = [
  {
    name: '需求制定',
    addable: true,
    tagColor: '',
  },
  {
    name: '开发中',
    addable: false,
    tagColor: 'blue',
  },
  {
    name: '测试中',
    addable: false,
    tagColor: 'blue',
  },
  {
    name: '已上线',
    addable: false,
    tagColor: '',
  },
  {
    name: '已完成',
    addable: false,
    tagColor: 'green',
  },
];

export const bugWorkflow: WorkFlowConfig[] = [
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
    tagColor: 'blue',
  },
  {
    name: '已解决',
    addable: false,
    tagColor: 'green',
  },
  {
    name: '已拒绝',
    addable: false,
    tagColor: 'green',
  },
  {
    name: '关闭',
    addable: false,
    tagColor: 'green',
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

export const projectStatusMap = new Map([
  [1, { color: 'blue', desc: '进度正常' }],
  [2, { color: 'orange', desc: '存在风险' }],
  [3, { color: 'red', desc: '进度失控' }],
]);

export const sprintStatusMap = new Map([
  [1, '待开始'],
  [2, '进行中'],
  [3, '已结束'],
]);

export const sprintStatusColorMap = new Map([
  [1, 'default'],
  [2, 'processing'],
  [3, 'success'],
]);


export const getStatusTagColor = (status: string) => {
  const workflow = storyWorkflow.concat(bugWorkflow);
  const target = workflow.find(item => item.name === status);
  return target?.tagColor;
};
