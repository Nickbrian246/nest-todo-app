export type TaskStatus = 'NO_STATUS' | 'PENDING' | 'PROGRESS' | 'DONE';
export interface KanbanTask {
  title: string;
  description: string;
  taskStatus: TaskStatus;
  client: string;
}

export interface UpdateKanbanTask extends KanbanTask {
  id: string;
}
