import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getPosts } from "./postApi"

export interface CounterState {
    value: number
}
export const fetchTodo = createAsyncThunk('posts/fetchTodo', async () => {
    const response = await getPosts()
    return response.todo
  })

const initialState: CounterState = {
    value: 0,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    },
    extraReducers = builder ((build) => {
        build.addCase('')
    })
})