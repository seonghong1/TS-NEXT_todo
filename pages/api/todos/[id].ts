import Data from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PATCH") {
        try {
            const todoId = Number(req.query.id)
            const todo = Data.todo.exist({ id: todoId })
            if (!todo) {
                res.statusCode = 404;
                res.end()
            } else {
                const todos = await Data.todo.getList();
                const changeTodos = todos.map((todo) => {
                    if (todo.id === todoId) {
                        return { ...todo, checked: !todo.checked }
                    } else {
                        return todo
                    }
                })
                Data.todo.write(changeTodos)
                res.statusCode = 200;
                res.end()
            }
            res.statusCode = 200;
            res.end()
        } catch (e) {
            console.log(e)
            res.statusCode = 500;
            res.send(e)
        }
    }
    if (req.method === "DELETE") {
        try {
            const todoId = Number(req.query.id)
            const todo = Data.todo.exist({ id: todoId })
            if (!todo) {
                res.statusCode = 404;
                res.end()
            }
            const todos = Data.todo.getList()
            const filteredTodos = todos.filter((todo) => {
                return todo.id !== todoId
            })
            Data.todo.write(filteredTodos)
            res.statusCode = 200;
            res.end()
        } catch (e) {
            console.log(e)
            res.statusCode = 500;
            res.end()
        }
    }
    res.statusCode = 405;
    return res.end()
}
