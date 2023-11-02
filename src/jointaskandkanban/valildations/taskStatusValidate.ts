import { KanbanTask } from '../interfaces';
/**
 *
 * @param kanbanTask recive a kanban task
 * @returns  returns true if kanban taskStatus is correct type and return false is no one kanban taskStatus matched
 */
export function validateTaskStatus(kanbanTask: KanbanTask) {
  if (kanbanTask.taskStatus === 'DONE') return true;
  if (kanbanTask.taskStatus === 'NO_STATUS') return true;
  if (kanbanTask.taskStatus === 'PENDING') return true;
  if (kanbanTask.taskStatus === 'PROGRESS') return true;
  return false;
}
