import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArrowButton } from './ui/arrow-button';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [sidebarIsOpen, setSidebarOpenState] = useState(false);
	const [articleState, setArticleState] = useState(defaultArticleState);

	function closeSidebar() {
		setSidebarOpenState(false);
	}

	function toggleSidebarOpen() {
		setSidebarOpenState(sidebarIsOpen ? false : true);
	}

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
					isOpen={sidebarIsOpen}
					articleState={articleState}
					setArticleState={setArticleState}>
					<ArrowButton isOpen={sidebarIsOpen} onClick={toggleSidebarOpen} />
				</ArticleParamsForm>
				<div onClick={closeSidebar}>
					<Article />
				</div>
			</main>
		</>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
