import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type FormProps = {
	fontFamily: OptionType;
	fontSize: OptionType;
	textColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

const App = () => {
	const {
		fontFamilyOption,
		fontSizeOption,
		backgroundColorOption,
		fontColorOption,
		contentWidthOption,
	} = defaultArticleState;

	const [fontFamily, setFontFamily] = useState<OptionType>(fontFamilyOption);
	const [fontSize, setFontSize] = useState<OptionType>(fontSizeOption);
	const [textColor, setTextColor] = useState<OptionType>(fontColorOption);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		backgroundColorOption
	);
	const [contentWidth, setContentWidth] =
		useState<OptionType>(contentWidthOption);

	const handleSubmit = (
		event: FormEvent<HTMLFormElement>,
		{
			fontFamily,
			fontSize,
			textColor,
			backgroundColor,
			contentWidth,
		}: FormProps
	): void => {
		event.preventDefault();
		setFontFamily(fontFamily);
		setFontSize(fontSize);
		setTextColor(textColor);
		setBackgroundColor(backgroundColor);
		setContentWidth(contentWidth);
	};

	const handleReset = (): void => {
		setFontFamily(fontFamilyOption);
		setFontSize(fontSizeOption);
		setTextColor(fontColorOption);
		setBackgroundColor(backgroundColorOption);
		setContentWidth(contentWidthOption);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamily.value,
					'--font-size': fontSize.value,
					'--font-color': textColor.value,
					'--container-width': contentWidth.value,
					'--bg-color': backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				handleSubmit={handleSubmit}
				handleReset={handleReset}
				fontFamily={fontFamily}
				fontSize={fontSize}
				textColor={textColor}
				backgroundColor={backgroundColor}
				contentWidth={contentWidth}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
