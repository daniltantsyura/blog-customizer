import { useState, CSSProperties } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import clsx from 'clsx';

import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<>
			<main
				className={clsx(styles.main)}
				style={
					{
						'--font-family': articleState.fontFamilyOption.value,
						'--font-size': articleState.fontSizeOption.value,
						'--font-color': articleState.fontColor.value,
						'--container-width': articleState.contentWidth.value,
						'--bg-color': articleState.backgroundColor.value,
					} as CSSProperties
				}>
				<ArticleParamsForm
					articleState={articleState}
					setArticleState={setArticleState}></ArticleParamsForm>
				<Article />
			</main>
		</>
	);
};
