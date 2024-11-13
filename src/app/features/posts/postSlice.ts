import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPosts } from './postApi';

// Define the post type based on the data structure returned by getPosts
interface Post {
    id: number;
    title: string;
    content: string;
    // Add other fields based on your data structure
}

// Define the state type
interface PostState {
    isError: boolean;
    isLoading: boolean;
    data: Post[];
}

// Fetch posts with a typed response
export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
    const posts = await getPosts();
    return posts;
});

// Define the initial state
const initialState: PostState = {
    isError: false,
    isLoading: false,
    data: []
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.isLoading = false;
                state.isError = false;
                state.data = action.payload;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});

export default postSlice.reducer;
