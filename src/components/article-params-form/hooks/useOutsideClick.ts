import { useEffect } from 'react';

type UseOutsideClick = {
	OnClose: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClick = ({ rootRef, OnClose }: UseOutsideClick) => {
	useEffect(() => {
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
	}, [rootRef]);
};
