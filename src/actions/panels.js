export const PANEL_ADD = 'PANEL_ADD';
export const PANEL_DELETE = 'PANEL_DELETE';
export const PANEL_EDIT = 'PANEL_EDIT';

export const changePanel = (panelIndex, newText) => ({
	type: PANEL_EDIT,
	payload: {
		panelIndex,
		newText
	}
})

export const addPanel = (value) => ({
	type: PANEL_ADD,
	payload: value
});

export const deletePanel = (index) => ({
	type: PANEL_DELETE,
	payload: index
})