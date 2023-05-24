import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import "./Todolist.css";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTasksStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTasksTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
             <AddItemForm  addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                           let newIsDoneValue = e.currentTarget.checked;
                           props.changeTasksStatus(t.id, newIsDoneValue, props.id);
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTasksTitle(t.id, newValue, props.id);
                        }

                        return <li key={t.id}>
                            <input type='checkbox'
                                   onChange={onChangeStatusHandler}
                                   checked={t.isDone}/>
                            <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onClickHandler}>x
                            </button>
                        </li>
                    })
                }
            </ul>
            <div className='title'>
                <div className='allName'>
                    <button className={props.filter === 'all' ? 'active-filter' : ''}
                            onClick={onAllClickHandler}>
                        All
                    </button>
                </div>
                <div className='activeName'>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={onActiveClickHandler}>Active
                    </button>
                </div>
                <div className='completedName'>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

