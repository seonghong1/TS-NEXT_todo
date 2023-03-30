import { TodoType } from "@/types/todo";
import { NextApiRequest, NextApiResponse } from "next";
import Data from "@/lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const todos = Data.todo.getList()
            console.log(Data.todo)
            res.statusCode = 200;
            res.send(todos)
        } catch (e) {
            console.log(e)
            res.statusCode = 500;
            res.send(e)
        }
    }
    if (req.method === "POST") {
        const { text, color } = req.body
        const todos = Data.todo.getList()
        let todoId: number
        if (todos.length > 1) {
            todoId = todos[todos.length - 1].id + 1;
        } else {
            todoId = 1
        }
        if (!text || !color) {
            res.statusCode = 400;
            return res.send("text 혹은 color가 없습니다.")
        }
        const newTodo = {
            id: todoId,
            text,
            color,
            checked: false
        };
        Data.todo.write([...todos, newTodo])
        res.statusCode = 200;
        res.end()
    }
    else {
        res.statusCode === 405;
        console.log(res.statusCode)
        return res.end()
    }
}