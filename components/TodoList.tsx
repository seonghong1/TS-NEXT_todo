import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { TodoType } from "@/types/todo";
import palette from "@/styles/palette";
import TrashCanIcon from "../public/static/svg/ic_todo_trash.svg"
import CheckMarkIcon from "../public/static/svg/ic_todo_check.svg"
import { checkAPi, deleteTodoAPI } from "@/lib/api/todo";
import { RootState } from "@/store";
import { useSelector } from "@/store";
import { todoActions } from "@/store/todo";
import { useDispatch } from "react-redux";



interface Iprops {
    todos: TodoType[]
}



const Container = styled.div`
    width: 100%;
    border: 1px solid black;
    box-sizing: border-box;
    .todo-list-header{
       font-size : 14px;
    }
    .todo-list-last-todo{
        margin-left: 8px;
    }
    .todo-list-header-round-color{
        width: 30px;
        height:30px;
        border-radius: 50%           ;
    }
    .todo-list-header-color{
        display: flex;
    }
    .bg-blue{
        background-color: ${palette.blue};
    }
    .bg-gray{
        background-color: ${palette.gray};
    }
    .bg-green{
        background-color: ${palette.green};
    }
    .bg-navy{
        background-color: ${palette.navy};
    }
    .bg-orange{
        background-color: ${palette.orange};
    }
    .bg-red{
        background-color: ${palette.red};
    }
    .bg-yellow{
        background-color: ${palette.yellow};
    }
    .bg-deep_green{
        background-color: ${palette.deep_green};
    }
    .bg-deep_red{
        background-color: ${palette.deep_red};
    }
    .todo-list{
        .todo-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 52px;
            border-bottom: 1px solid ${palette.gray};
        }
        .todo-left-side{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
        }
        .todo-color-block{
            width: 12px;
            height: 100%;
        }
        .checked-todo-text{
            color: ${palette.gray};
            text-decoration: line-through;
        }
        .todo-text{
            margin-left: 12px;
            font-size: 16px;
        }
        .todo-right-side{
            display: flex;
            margin-right: 12px;
            .todo-button{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: transparent;
                outline: none;
                border: 1px solid ${palette.gray};
            }
        }
    }
`



const TodoList: React.FC<Iprops> = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state: RootState) => state.todo.todos)
    console.log(todos)
    const getTodoColorNums = useCallback(() => {
        let red = 0;
        let orange = 0;
        let yellow = 0;
        let green = 0;
        let blue = 0;
        let navy = 0;
        todos.forEach((todo) => {
            switch (todo.color) {
                case "red":
                    red += 1;
                    break;
                case "orange":
                    orange += 1;
                    break;
                case "yellow":
                    yellow += 1;
                    break;
                case "green":
                    green += 1;
                    break;
                case "blue":
                    blue += 1;
                    break;
                case "navy":
                    navy += 1;
                    break;
                default:
                    break;
            }
        })
        return {
            red,
            orange,
            yellow,
            green,
            blue,
            navy
        }
    }, [todos])
    const todoColorNums = useMemo(getTodoColorNums, [todos])

    type ObjectIndexType = {
        [key: string]: number | undefined;
    }
    const todoColorNums2 = useMemo(() => {
        const colors: ObjectIndexType = {}
        todos.forEach((todo) => {
            const value = colors[todo.color]
            if (!value) {
                colors[`${todo.color}`] = 1
            } else {
                colors[`${todo.color}`] = value + 1
            }
        })
        return colors
    }, [todos])
    const checkTodo = async (id: number) => {
        try {
            await checkAPi(id)
            const newTodos = todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, checked: !todo.checked }
                }
                return todo
            })
            dispatch(todoActions.setTodo(newTodos))

        } catch (e) {
            console.log(e)
        }
    }
    const deleteTodo = async (id: number) => {
        try {
            await deleteTodoAPI(id)
            const newTodos = todos.filter((todo) => {
                return todo.id !== id
            })
            dispatch(todoActions.setTodo(newTodos))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Container>
            <div className="color_info_box">

            </div>
            <div className="todo-list-header">
                <p className="todo-list-last-todo">
                    남은 todolist : {todos.length}개
                </p>
                <div className="todo-list-header-color">
                    {Object.keys(todoColorNums2).map((color, index) => (
                        <div className="todo-list-header-color-num" key={index}>
                            <div className={`todo-list-header-round-color bg-${color}`}></div>
                            <p>{todoColorNums2[color]}개</p>
                        </div>
                    ))}
                </div>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => {
                    return (
                        <li className="todo-item" key={todo.id}>
                            <div className="todo-left-side">
                                <div className={`todo-color-block bg-${todo.color}`}></div>
                                <p className={`todo-text ${todo.checked ? "checked-todo-text" : ""}`}>
                                    {todo.text}
                                </p>
                            </div>
                            <div className="todo-right-side">
                                {todo.checked && (
                                    <>
                                        <TrashCanIcon className="todo-trash-can" onClick={() => {
                                            deleteTodo(todo.id)
                                        }} />
                                        <CheckMarkIcon className="todo-check-mark" onClick={() => { checkTodo(todo.id) }} />
                                    </>
                                )}
                                {!todo.checked && (
                                    <button
                                        type="button"
                                        className="todo-button"
                                        onClick={() => { checkTodo(todo.id) }}
                                    ></button>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </Container>
    )
}
export default TodoList