import { Display } from "./display";
import { Emphasis } from "./emphasis";
import { Heading } from "./heading";
import { List, ListItem } from "./list";

import { Paragraph } from "./paragraph";
import { Strong } from "./strong";
import { Text } from "./text";

export const Typography = {
	Display,
	Emphasis,
	Heading,

	List,
	ListItem,
	Paragraph,
	Strong,
	Text,
} as const;

export type { DisplayProps } from "./display";
export type { EmphasisProps } from "./emphasis";
export type { HeadingProps } from "./heading";

export type { ListProps } from "./list";
export type { ParagraphProps } from "./paragraph";
export type { StrongProps } from "./strong";
export type { TextProps } from "./text";
