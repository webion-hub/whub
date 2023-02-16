import { BlogApi } from "@webion/api-blog";
import BlogContext from "../BlogContext/BlogContext";

export const blogFactory = () => new BlogApi(BlogContext.api)
export const useBlog = () => blogFactory()