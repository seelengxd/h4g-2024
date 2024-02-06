import { Blog, BlogPostData } from "../../types/blogs/blogs";
import client from "../base";


class BlogsAPI {
    protected getBlogsUrl(): string {
        return "/blogs"
    }

    public async getAllBlogs(): Promise<Blog[]> {
        const response = await client.get(this.getBlogsUrl());
        return response.data.data;
    }

    public async getBlog(id: number): Promise<Blog> {
        const response = await client.get(`${this.getBlogsUrl()}/${id}`);
        return response.data.data;
    }

    public async createBlog(data: BlogPostData): Promise<Number> {
        const form = new FormData();

        form.append("title", data.title);
        form.append("description", data.description);
        data.tags.forEach((tag) => form.append('tags', tag.toString()));

        if (data.images) {
            data.images.forEach((image) => form.append('images[]', image as Blob));
        };

        const response = await client.post(this.getBlogsUrl(), form);
        return response.data.id;
    }

    public async updateBlog(id: number, data: BlogPostData): Promise<Number> {
        const form = new FormData();

        form.append("title", data.title);
        form.append("description", data.description);
        data.tags.forEach((tag) => form.append('tags', tag.toString()));
        data.likes.forEach((like) => form.append('like', like.toString()));

        if (data.images) {
            data.images.forEach((image) => form.append('images[]', image as Blob));
        };

        const response = await client.put(`${this.getBlogsUrl()}/${id}`, form);
        return response.data.id;
    }

    public async deleteBlog(id: number) {
        await client.delete(`${this.getBlogsUrl()}/${id}`)
    }
}

const blogsAPI = new BlogsAPI();
export default blogsAPI;