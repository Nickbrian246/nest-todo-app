import { JoinKanbanAndToDo, TodoTask, KanbanTask } from '../interfaces';
/**
 * this function determine if the in coming task is from toDo or kanban
 * @param task recibo los pamatetros
 * @returns return  a boolean true if the task comes from toDo and false if task come from kanban
 */
export function checkIfIsFromTodoOrKankan(task: JoinKanbanAndToDo) {
  if (task?.isDone) {
    return true;
  }
  return false;
}

export function addPropertiesToCompleteKanban(toDo: TodoTask): KanbanTask {
  const addPropertiesToCompletKanban: KanbanTask = {
    client: toDo.client,
    description: '',
    taskStatus: 'NO_STATUS',
    title: toDo.title,
  };
  return addPropertiesToCompletKanban;
}

export function filterPropiertiesForToDo(kanban: KanbanTask): TodoTask {
  const toDo: TodoTask = {
    client: kanban.client,
    isDone: kanban.taskStatus === 'DONE' ? true : false,
    title: kanban.title,
  };
  return toDo;
}

// si viene isDone y title entonece es un Todo
// si es un todo tengo que agregarle las propiedades faltantas para el kanban

// si viene con title, description, taskStatus,entonces entendemos que viene de kanban
// por lo tanto tendria que generar un nuevo para todos conservando title y agregando la propiedad
// de isDone
