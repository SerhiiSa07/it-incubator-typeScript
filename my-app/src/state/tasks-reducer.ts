import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTotodlistActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type ActionsTypes = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTotodlistActionType | RemoveTodoListActionType

const initialState: TaskStateType = {
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTypes): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks;

            return stateCopy;
        }
        case 'ADD-TASK' : {

            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS' : {

            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                isDone: action.isDone
            } : t);
            return ({...state});
        }

        case 'CHANGE-TASK-TITLE' : {

            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                title: action.title
            } : t);

            return ({...state});
        }

        case 'ADD-TODOLIST' : {
            return {
                ...state, [action.todolistId]: []
            }
        }

        case 'REMOVE-TODOLIST' : {
            const copyState = {...state};
            delete copyState[action.id]
            return copyState;
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}