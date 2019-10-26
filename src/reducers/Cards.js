import { CARDS_ADD, CARDS_DELETE, CARDS_EDIT, CARDS_REORDER } from '../actions/cards';
import { PANEL_ADD, PANEL_DELETE, PANEL_EDIT } from '../actions/panels';

const initialState = {
	items: [
		{
			title: 'Заголовок 1 панелі',
			cards: [
			'React JS', 
			'Redux JS' 
			]
		},	
		{
			title: 'Заголовок 2 панелі',
			cards: [
			'NPM', 
			'Node JS',
			'DND'
			]
		}
	]
};

const reorderCards = ({ state, source, destination }) => {
  const { index: sourceCardIndex, droppableId: sourceId } = source;
  const {
    index: destinationCardIndex,
    droppableId: destinationId
  } = destination;
  const sourcePanelIndex = parseInt(sourceId.replace("panel-", ""));
  const destinationPanelIndex = parseInt(destinationId.replace("panel-", ""));

  return state.items.map((item, currentPanelIndex) => {
    if (destinationPanelIndex === currentPanelIndex) {
      const [sourceCard] = state.items[sourcePanelIndex].cards.splice(
        sourceCardIndex,
        1
      );
      const destinationCards = Array.from(state.items[destinationPanelIndex].cards);
      destinationCards.splice(destinationCardIndex, 0, sourceCard);
      item.cards = destinationCards;
    }

    return item;
  });
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CARDS_ADD:
			return {
				...state,
			 items: state.items.map((item, index) => {
					if(action.payload.panelIndex === index) {
						return {
							...item,
							cards: [...item.cards, action.payload.text]
						}
					}
					return item;
				})
			}
			
		case PANEL_ADD: 
			return {
				...state,
				items: [...state.items, { title: action.payload, cards: []}]
			}

		case PANEL_DELETE: 
			return {
				...state,
				items: state.items.filter((_,index) => index !== action.payload)
			}

		case PANEL_EDIT: 
			return {
				...state, 
				items: state.items.map((_panel, index) => {
					if(index === action.payload.panelIndex)
					 _panel.title = action.payload.newText
					return _panel;
				})
			}
		
		case CARDS_DELETE: 
			return {
				...state,
				items: state.items.map((item, index) => {
					if(action.payload.panelIndex === index) {
						return {
							...item,
							cards: item.cards.filter((_,_cardInd) => _cardInd !== action.payload.cardIndex)
						}
					}
					return item;
				})
			}
			
			case CARDS_EDIT: 
				return {
					...state,
					items: state.items.map((item, index) => {
						if(action.payload.panelIndex === index) {
							return {
								...item,
								cards: item.cards.map((_card, cardInd) => {
									if(cardInd === action.payload.cardIndex)
										_card = action.payload.newText;		
									return _card
								})
							}
						}
						return item;
					})
				}

			case CARDS_REORDER: 
			const { source, destination } = action.payload;
			return {
				items: reorderCards({
					state,
					source,
					destination
				})
			}

		default: 
			return state
	}
} 