import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useEffect, useState, useRef } from 'react';
import cn from 'classnames';

import styles from './ArticleParamsForm.module.scss';
import { OnClick, OnClickSubmit } from '../arrow-button/ArrowButton';
import { Select } from '../select';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	fontColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClick } from './hooks/useOutsideClick';

type ArticleProps = {
	handleSubmit: OnClickSubmit;
	handleReset: OnClick;
	fontFamily: OptionType;
	fontSize: OptionType;
	textColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

export const ArticleParamsForm = (props: ArticleProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const [fontFamily, setFontFamily] = useState<OptionType>(props.fontFamily);
	const [fontSize, setFontSize] = useState<OptionType>(props.fontSize);
	const [textColor, setTextColor] = useState<OptionType>(props.textColor);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		props.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		props.contentWidth
	);

	const sidebarRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setFontFamily(props.fontFamily);
		setFontSize(props.fontSize);
		setTextColor(props.textColor);
		setBackgroundColor(props.backgroundColor);
		setContentWidth(props.contentWidth);
	}, [props]);

	const toggleOpen: OnClick = () => {
		setIsOpen(!isOpen);
	};

	const OnClose = (): void => {
		setIsOpen(false);
	};

	useOutsideClick({ rootRef: sidebarRef, OnClose });

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
			<ArrowButton isOpen={isOpen} toggleOpen={toggleOpen} />
			<aside
				className={cn(styles.container, isOpen ? styles.container_open : '')}>
				<form
					className={styles.form}
					onSubmit={(e) =>
						props.handleSubmit(e, {
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
						<Button title='Сбросить' type='reset' onClick={props.handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
