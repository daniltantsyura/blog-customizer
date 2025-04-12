import { useState, ReactNode, FormEvent } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ParamsFormProps = {
	isOpen: boolean;
	children: ReactNode;
	articleState: ArticleStateType;
	setArticleState(state: ArticleStateType): void;
};

export const ArticleParamsForm = ({
	isOpen,
	children,
	articleState,
	setArticleState,
}: ParamsFormProps) => {
	const [state, setState] = useState(articleState);

	function apply(event?: FormEvent) {
		setArticleState(state);
		event?.preventDefault();
	}

	function reset() {
		setState(defaultArticleState);
		setArticleState(defaultArticleState);
	}

	function onFontSizeChange(value: OptionType) {
		setState({ ...state, fontSizeOption: value });
	}

	return (
		<>
			{children}
			<aside
				className={clsx([styles.container, isOpen && styles.container_open])}>
				<form className={styles.form} onSubmit={apply} onReset={reset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<fieldset className={styles.fieldset}>
						<Select
							selected={state.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={(selected: OptionType) => {
								setState({ ...state, fontFamilyOption: selected });
							}}
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={state.fontSizeOption}
							title='Размер шрифта'
							onChange={onFontSizeChange}
						/>
						<Select
							selected={state.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={(selected: OptionType) =>
								setState({ ...state, fontColor: selected })
							}
						/>
					</fieldset>
					<Separator></Separator>
					<fieldset className={styles.fieldset}>
						<Select
							selected={state.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={(selected: OptionType) =>
								setState({ ...state, backgroundColor: selected })
							}
						/>
						<Select
							selected={state.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={(selected: OptionType) =>
								setState({ ...state, contentWidth: selected })
							}
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
