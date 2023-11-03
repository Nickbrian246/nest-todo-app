import { JoinKanbanAndToDo, TodoTask, KanbanTask } from '../interfaces';
/**
 * this function determine if the in coming task is from toDo or kanban
 * @param task recibo los pamatetros
 * @returns return  a boolean true if the task comes from toDo and false if task come from kanban
 */
export function checkIfIsFromTodoOrKankan(task: JoinKanbanAndToDo) {
  if (task?.isDone !== undefined) {
    return true;
  }
  return false;
}

export function addPropertiesToCompleteKanban(toDo: TodoTask): KanbanTask {
  const checkToDoIsDonePropertie: KanbanTask = checkIsDoneOfTaskStatus(toDo);

  const addPropertiesToCompletKanban: KanbanTask = {
    client: checkToDoIsDonePropertie.client,
    description: '',
    taskStatus: checkToDoIsDonePropertie.taskStatus,
    title: checkToDoIsDonePropertie.title,
    commonId: checkToDoIsDonePropertie.commonId,
  };
  return addPropertiesToCompletKanban;
}
/**
 *  this function checks the  isDone status from toDo and assign  "DONE" To taskStatus if toDo.isDone is true
 * otherwise assigns "PENDING"
 * @param toDo takes a toDo
 * @returns kanbanTask
 */
export function checkIsDoneOfTaskStatus(toDo: TodoTask): KanbanTask {
  const kanbanTask: KanbanTask = {
    title: toDo.title,
    client: toDo.client,
    description: '',
    taskStatus: toDo.isDone ? 'DONE' : 'PENDING',
    commonId: toDo.commonId,
  };
  return kanbanTask;
}
/**
 *this function filter kanban properties to ToDo preperties
 * @param kanban recive an kanban
 * @returns an Todo
 */
export function filterPropiertiesForToDo(kanban: KanbanTask): TodoTask {
  const checkkanbanTaskStatus = checkIfKanbanIsDoneforToDo(kanban);
  const toDo: TodoTask = {
    client: checkkanbanTaskStatus.client,
    isDone: checkkanbanTaskStatus.isDone,
    title: checkkanbanTaskStatus.title,
    commonId: checkkanbanTaskStatus.commonId,
  };
  return toDo;
}
/**
 *this function checks the status of taskStatus  and if is "DONE" assign true to "isDone" task propertie
 * @param kanban takes a kanban
 * @returns return a task with isDone propertie adapted
 */
export function checkIfKanbanIsDoneforToDo(kanban: KanbanTask): TodoTask {
  const toDo: TodoTask = {
    client: kanban.client,
    isDone: kanban.taskStatus === 'DONE' ? true : false,
    title: kanban.title,
    commonId: kanban.commonId,
  };
  return toDo;
}
