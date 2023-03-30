import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todo from "./todo"
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

declare module 'react-redux' {
    interface DefaulRootState extends RootState { }
}

const rootReducer = combineReducers({
    todo: todo.reducer
})

const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        if (state.count) nextState.count = state.count
        return nextState
    }
    return rootReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>;

const initStore = () => {
    return configureStore({
        reducer,
        devTools: true
    })
}

export const wrapper = createWrapper(initStore)







// import { createStore, applyMiddleware, combineReducers } from "redux";
// import { HYDRATE, createWrapper } from "next-redux-wrapper";
// import todo from "./todo"

// const rootReducer = combineReducers({
//     todo,
// })




// const reducer = (state: any, action: any) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state,
//             ...action.payload
//         }
//         return nextState
//     }
//     return rootReducer(state, action)
// }

// export type RootState = ReturnType<typeof rootReducer>

// const bindMiddleware = (middleware: any) => {
//     if (process.env.NODE_ENV !== "production") {
//         const { composeWithDevTools } = require("redux-devtools-extension")
//         return composeWithDevTools(applyMiddleware(...middleware))
//     }
//     return applyMiddleware(...middleware)
// }
// const initStore = () => {
//     return createStore(reducer, bindMiddleware([]))
// }
// export const wrapper = createWrapper(initStore)