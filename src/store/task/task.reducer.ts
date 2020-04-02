import {
  SET_CLASS_INFO,
  SET_CREATE_TASK_PROPS,
  SET_VIEW_TASK_PROPS,
  SET_CLASS_INFO_LOADING,
  SET_TASK_LIST,
  SET_TASK_LIST_LOADING,
} from './actionTypes';

export interface CreateTaskProps {
  visible: boolean;
  type: number;
  projectId: string;
  taskClass: string;
  stage: string;
}

export interface ViewTaskProps {
  taskId: string;
  visible: boolean;
  projectId?: string;
  type?: number;
  taskClass?: string;
  refetch: () => void;
}

export interface TaskState {
  classInfoLoading: boolean;
  classInfo: any;
  createTaskProps: CreateTaskProps;
  viewTaskProps: ViewTaskProps;
  taskList: Array<any>;
  taskListLoading: boolean;
}

const defaultState: TaskState = {
  classInfoLoading: false,
  classInfo: {},
  createTaskProps: {
    visible: false,
    type: 1,
    projectId: '',
    taskClass: 'default',
    stage: '',
  },
  viewTaskProps: {
    taskId: '',
    visible: false,
    refetch: () => {},
  },
  taskList: [],
  taskListLoading: false,
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_CLASS_INFO_LOADING:
      return { ...state, classInfoLoading: action.data };
    case SET_CLASS_INFO:
      return { ...state, classInfo: action.data };
    case SET_CREATE_TASK_PROPS:
      return { ...state, createTaskProps: action.data };
    case SET_VIEW_TASK_PROPS:
      return { ...state, viewTaskProps: action.data };
    case SET_TASK_LIST:
      return { ...state, taskList: action.data };
    case SET_TASK_LIST_LOADING:
      return { ...state, taskListLoading: action.data };
    default:
      return state;
  }
};
