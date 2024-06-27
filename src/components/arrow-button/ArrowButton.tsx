import arrow from 'src/images/arrow.svg';
import { FormEvent } from 'react';

import styles from './ArrowButton.module.scss';
import cn from 'classnames';
import { FormProps } from 'src/index';
/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
export type OnClickSubmit = (
	evt: FormEvent<HTMLFormElement>,
	data: FormProps
) => void;

export type ArrowButtonProps = {
	isOpen: boolean;
	toggleOpen: OnClick;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	const { isOpen, toggleOpen } = props;

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={cn(styles.container, isOpen ? styles.container_open : '')}
			onClick={toggleOpen}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={cn(styles.arrow, isOpen ? styles.arrow_open : '')}
			/>
		</div>
	);
};
