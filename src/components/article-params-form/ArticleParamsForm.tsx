import { ArrowButton } from '../../components/arrow-button';
import { Button } from '../../components/button';
import { useState, useRef, CSSProperties, FormEvent } from 'react';
import cn from 'classnames';

import styles from './ArticleParamsForm.module.scss';
import { OnClick } from '../arrow-button/ArrowButton';
import { Select } from '../select';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	fontColors,
	contentWidthArr,
	defaultArticleState,
} from '../../constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClick } from './hooks/useOutsideClick';

type ArticleProps = {
	setVariablesStyles: React.Dispatch<React.SetStateAction<CSSProperties>>;
};

export type FormProps = {
	fontFamily: OptionType;
	fontSize: OptionType;
	textColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

export const ArticleParamsForm = (props: ArticleProps) => {
	const {
		fontFamilyOption,
		fontSizeOption,
		backgroundColorOption,
		fontColorOption,
		contentWidthOption,
	} = defaultArticleState;

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const [fontFamily, setFontFamily] = useState<OptionType>(fontFamilyOption);
	const [fontSize, setFontSize] = useState<OptionType>(fontSizeOption);
	const [textColor, setTextColor] = useState<OptionType>(fontColorOption);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		backgroundColorOption
	);
	const [contentWidth, setContentWidth] =
		useState<OptionType>(contentWidthOption);

	const sidebarRef = useRef<HTMLDivElement | null>(null);

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
		props.setVariablesStyles({
			'--font-family': fontFamily.value,
			'--font-size': fontSize.value,
			'--font-color': textColor.value,
			'--container-width': contentWidth.value,
			'--bg-color': backgroundColor.value,
		} as CSSProperties);
	};

	const handleReset = (): void => {
		setFontFamily(fontFamilyOption);
		setFontSize(fontSizeOption);
		setTextColor(fontColorOption);
		setBackgroundColor(backgroundColorOption);
		setContentWidth(contentWidthOption);

		props.setVariablesStyles({
			'--font-family': fontFamilyOption.value,
			'--font-size': fontSizeOption.value,
			'--font-color': fontColorOption.value,
			'--container-width': contentWidthOption.value,
			'--bg-color': backgroundColorOption.value,
		} as CSSProperties);
	};

	const toggleOpen: OnClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const OnClose = (): void => {
		setIsMenuOpen(false);
	};

	useOutsideClick({ isMenuOpen, rootRef: sidebarRef, OnClose });

	const changeFontFamily = (font: OptionType): void => {
		setFontFamily(font);
	};

	const changeFontSize = (size: OptionType): void => {
		setFontSize(size);
	};

	const changeBackgroundColor = (color: OptionType): void => {
		setBackgroundColor(color);
	};

	const changeTextColor = (color: OptionType): void => {
		setTextColor(color);
	};

	const changeContentWidth = (content: OptionType): void => {
		setContentWidth(content);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton isMenuOpen={isMenuOpen} toggleOpen={toggleOpen} />
			<aside
				className={cn(
					styles.container,
					isMenuOpen ? styles.container_open : ''
				)}>
				<form
					className={styles.form}
					onSubmit={(e) =>
						handleSubmit(e, {
							fontFamily,
							fontSize,
							textColor,
							backgroundColor,
							contentWidth,
						})
					}>
					<div className={styles.spacing}>
						<h2 className={styles.title}>Задайте параметры</h2>
					</div>
					<div className={styles.spacing}>
						<Select
							selected={fontFamily}
							options={fontFamilyOptions}
							onChange={changeFontFamily}
							title='шрифт'
						/>
					</div>
					<div className={styles.spacing}>
						<RadioGroup
							name='size'
							options={fontSizeOptions}
							selected={fontSize}
							title='Размер шрифта'
							onChange={changeFontSize}
						/>
					</div>
					<div className={styles.spacing}>
						<Select
							selected={textColor}
							options={fontColors.map((option: OptionType): OptionType => {
								option.optionClassName === backgroundColor.optionClassName
									? (option.isUnavailable = true)
									: (option.isUnavailable = false);
								return option;
							})}
							onChange={changeTextColor}
							title='Цвет шрифта'
						/>
					</div>
					<div className={styles.spacing}>
						<Separator />
					</div>
					<div className={styles.spacing}>
						<Select
							selected={backgroundColor}
							options={backgroundColors.map(
								(option: OptionType): OptionType => {
									option.optionClassName === textColor.optionClassName
										? (option.isUnavailable = true)
										: (option.isUnavailable = false);
									return option;
								}
							)}
							onChange={changeBackgroundColor}
							title='Цвет фона'
						/>
					</div>
					<div className={styles.spacing}>
						<Select
							selected={contentWidth}
							options={contentWidthArr}
							onChange={changeContentWidth}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
