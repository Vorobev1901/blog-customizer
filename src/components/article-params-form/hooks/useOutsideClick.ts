import { useEffect } from 'react';

type UseOutsideClick = {
	isMenuOpen: boolean;
	OnClose: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClick = ({
	isMenuOpen,
	rootRef,
	OnClose,
}: UseOutsideClick) => {
	useEffect(() => {
		if (!isMenuOpen) return;

		const handleOutsideClick = (event: Event) => {
			const { target } = event;

			if (target instanceof Node && !rootRef.current?.contains(target)) {
				OnClose();
			}
		};

		window.addEventListener('mousedown', handleOutsideClick);

		return () => {
			window.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [rootRef, isMenuOpen]);
};
