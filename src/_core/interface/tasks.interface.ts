export interface ITaskItem {
  id: string;
  title: string;
  description: string;
}

export interface ITaskList {
  id: string;
  title: string;
  items: ITaskItem[];
}

export interface IUpdateTaskItem {
  listId: string,
  item: ITaskItem
}
