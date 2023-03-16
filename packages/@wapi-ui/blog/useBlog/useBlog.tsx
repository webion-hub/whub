import { BlogApi } from "@wapi/blog";
import BlogContext from "../BlogContext/BlogContext";

export const blogFactory = () => new BlogApi(BlogContext.api)
export const useBlog = () => blogFactory()