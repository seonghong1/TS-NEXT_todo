import { readFileSync, writeFileSync } from "fs";
import { TodoType } from "@/types/todo";

const getList = () => {
    const todoBuffer = readFileSync("data/todos.json")
    const todosString = todoBuffer.toString()
    if (!todosString) {
        return []
    } else {
        const todos: TodoType[] = JSON.parse(todosString)
        return todos
    }
}

const exist = ({ id }: { id: number }) => {
    const todos = getList()
    const todo = todos.some((todo) => todo.id === id)
    return todo
}

const write = async (todos: TodoType[]) => {
    writeFileSync("data/todos.json", JSON.stringify(todos))
}


export default { getList, exist, write }