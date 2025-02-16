import { HttpStatusCode } from "@solidjs/start";
import { Page, Anchor, Typography } from "~/components";

export default function NotFound() {
	return (
		<Page title="404" description="Not Found" reverse>
			<HttpStatusCode code={404} />
			<div class="mt-12 mx-auto max-w-md flex flex-col items-center justify-center text-center">
				<Typography.Heading
					class="mt-8 block text-5xl font-extrabold sm:text-6xl text-red-400"
					size="xl"
				>
					404
				</Typography.Heading>
				<Typography.Paragraph size="lg" variant="subdued" class="mt-12">
					Oops! The page you’re looking for doesn’t exist.
				</Typography.Paragraph>
				<Anchor class="mt-4" variant={"distinguished"} href="/">
					Go Back Home
				</Anchor>
			</div>
		</Page>
	);
}
