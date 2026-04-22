import { body } from "/src/routes/blog/(post)/test-typ.typ?parts";

export default function TypstBlogPost() {
	return <div class="typst-content" innerHTML={body} />;
}
