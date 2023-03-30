import axios from ".";
import { TodoType } from "@/types/todo";

//todolist 불러오기 api
export const getTodosAPI = () => axios.get<TodoType[]>("api/todos")
// todo checked하기
export const checkAPi = (id: number) => axios.patch<TodoType[]>(`api/todos/${id}`)
// todo 생성하기
interface AddTodoAPIBody {
    text: string,
    color: TodoType["color"]
}
export const addTodoAPI = (body: AddTodoAPIBody) => axios.post("api/todos", body)
// todo 삭제
export const deleteTodoAPI = (id: number) => axios.delete(`api/todos/${id}`)