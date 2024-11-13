'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/posts/postSlice";
import { RootState, AppDispatch } from "./store"; // Assuming RootState and AppDispatch are defined in store.ts

export default function Home() {
    const { data: posts, isLoading, isError } = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    let content;

    if (isLoading) {
        content = <h1>Loading posts...</h1>;
    } else if (isError) {
        content = <h1>Error loading posts</h1>;
    } else if (!isLoading && !isError && posts.length === 0) {
        content = <h1>No posts found</h1>;
    } else if (!isLoading && !isError && posts.length > 0) {
        content = posts.map((post) => <div key={post.id}>{post.title}</div>);
    }

    return <div>{content}</div>;
}
