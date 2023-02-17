import { BlogApi } from '@webion/api-blog';

declare const blogFactory: () => BlogApi;
declare const useBlog: () => BlogApi;

export { blogFactory, useBlog };
