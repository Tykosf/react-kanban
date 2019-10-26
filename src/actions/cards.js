export const CARDS_ADD = 'CARDS_ADD';
export const CARDS_DELETE = 'CARDS_DELETE';
export const CARDS_EDIT = 'CARDS_EDIT';
export const CARDS_REORDER = 'CARDS_REORDER';

export const addCards = (panelIndex, text) => ({
	type: CARDS_ADD,
	payload: {
		panelIndex,
		text
	}
});

export const deleteCards = (panelIndex, cardIndex) => ({
	type: CARDS_DELETE,
	payload: {
		panelIndex,
		cardIndex
	}
})

export const changeCards = (panelIndex, cardIndex, newText) => ({
	type: CARDS_EDIT,
	payload: {
		panelIndex,
		cardIndex,
		newText
	}
})

export const reorderCards = ({ source, destination }) => ({
	type: CARDS_REORDER,
	payload: {
		source,
		destination
	}
})


