import { NextPage } from "next";
import TodoList from "@/components/TodoList";
import { TodoType } from "@/types/todo";
import { getTodosAPI } from "@/lib/api/todo";
import { wrapper } from "@/store";
import { todoActions } from "@/store/todo";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import React from "react";



interface Iprops {
  todos: TodoType[]
}



const index: NextPage<Iprops> = ({ todos }) => {
  return (
    <TodoList todos={[]} />
  )


}

export const SET_TODO_LIST = "todo/SET_TODO_LIST"

export const setTodo = (payload: TodoType[]) => {
  return {
    type: SET_TODO_LIST,
    payload
  }
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      try {
        const { data } = await getTodosAPI();
        store.dispatch(todoActions.setTodo(data))
        return { props: { todos: data } }
      } catch (e) {
        console.log(e)
        return { props: { todos: [] } }
      }
    }
)



export default index