import React, { useState } from "react"
import styled from "styled-components"
import BrushIcon from "../public/static/svg/icon_todo_brush.svg"
import palette from "@/styles/palette"
import { TodoType } from "@/types/todo"
import { addTodoAPI } from "@/lib/api/todo"
import { useRouter } from "next/router"

const Container = styled.div`
    padding: 16px;
    box-sizing: border-box;
    .add-todo-header-title{
        font-size: 21px;
    }
    .add-todo-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .add-todo-submit-button{
        padding: 4px 8px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
        outline: none;
        font-size: 14px;
    }
    .add-todo-colors-wrapper{
        width: 100%;
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
    }
    .add-todo-color-list{
        display: flex;
        button{
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 16px;
            border: 0;
            &:last-child{
                margin-right: 0px;
            };
        }
        .add-todo-selected-color{
            border: 2px solid black !important;
        }
    }
    .bg-blue{
        background-color: ${palette.blue};
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

    textarea{
        width: 100%;
        border-radius: 5px;
        height: 300px;
        border-color: ${palette.gray};
        margin-top: 12px;
        resize: none;
        outline: none;
        padding: 12px;
        font-size: 16px;
        box-sizing: border-box;
    }

`

const AddTodo: React.FC = () => {
    const router = useRouter()
    const [text, setText] = useState("")
    const [selectedColor, setSelectedColor] = useState<TodoType["color"]>()
    const addTodo = async () => {
        try {
            if (!text || !selectedColor) {
                alert("색상과 할 일을 입력해주세요")
                return;
            }
            await addTodoAPI({ text, color: selectedColor });
            router.push("/")
            console.log("추가했습니다.")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <div className="add-todo-header">
                <h1 className="add-todo-header-title">Add Todo</h1>
                <button
                    type="button"
                    className="add-todo-submit-button"
                    onClick={() => { addTodo() }}
                >
                    추가하기
                </button>
            </div>
            <div className="add-todo-colors-wrapper">
                <div className="add-todo-color-list">
                    {["red", "orange", "yellow", "green", "blue", "navy"].map((color, index) => {
                        return (
                            <button
                                key={index}
                                type="button"
                                className={`add-todo-color-button bg-${color} ${color === selectedColor ? "add-todo-selected-color" : ""}`}
                                onClick={() => { setSelectedColor(color as TodoType["color"]) }}></button>
                        )
                    })}
                </div>
                <BrushIcon />
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="할 일을 입력해주세요 ~!"></textarea>
        </Container>
    )
}
export default AddTodo