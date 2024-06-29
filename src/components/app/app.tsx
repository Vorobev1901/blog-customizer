import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const {
		fontFamilyOption,
		fontSizeOption,
		backgroundColorOption,
		fontColorOption,
		contentWidthOption,
	} = defaultArticleState;

	const [styleVariables, setStyleVariables] = useState({
		'--font-family': fontFamilyOption.value,
		'--font-size': fontSizeOption.value,
		'--font-color': fontColorOption.value,
		'--container-width': contentWidthOption.value,
		'--bg-color': backgroundColorOption.value,
	} as CSSProperties);

	return (
		<main className={styles.main} style={styleVariables}>
			<ArticleParamsForm setVariablesStyles={setStyleVariables} />
			<Article />
		</main>
	);
};
