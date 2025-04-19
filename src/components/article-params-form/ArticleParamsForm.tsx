import { useState, FormEvent, useRef, useEffect } from 'react';
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
import { ArrowButton } from 'src/ui/arrow-button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState(state: ArticleStateType): void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ParamsFormProps) => {
	const [state, setState] = useState(articleState);
	const [isOpen, setOpenState] = useState(false);
	const sideBarRef = useRef<HTMLDivElement | null>(null);

	function toggleSidebarOpen() {
		setOpenState(isOpen ? false : true);
	}

	function apply(event?: FormEvent) {
		setArticleState(state);
		event?.preventDefault();
	}

	function reset() {
		setState(defaultArticleState);
		setArticleState(defaultArticleState);
	}

	function onInputChange(
		value: OptionType,
		optionName: keyof ArticleStateType
	) {
		setState({ ...state, [optionName]: value });
	}

	useEffect(() => {
		function closeByEscape(event: KeyboardEvent) {
			if (event.code === 'Escape') {
				setOpenState(false);
			}
		}

		document.addEventListener('keydown', closeByEscape);

		return () => {
			document.removeEventListener('keydown', closeByEscape);
		};
	});

	useOutsideClickClose({
		isOpen,
		rootRef: sideBarRef,
		onChange: setOpenState,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebarOpen} />
			<aside
				className={clsx([styles.container, isOpen && styles.container_open])}
				ref={sideBarRef}>
				<form className={styles.form} onSubmit={apply} onReset={reset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected: OptionType) =>
							onInputChange(selected, 'fontFamilyOption')
						}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title='Размер шрифта'
						onChange={(value) => onInputChange(value, 'fontSizeOption')}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected: OptionType) =>
							onInputChange(selected, 'fontColor')
						}
					/>
					<Separator></Separator>
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected: OptionType) =>
							onInputChange(selected, 'backgroundColor')
						}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected: OptionType) =>
							onInputChange(selected, 'contentWidth')
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
