import React from 'react';
import Panel from '../components/Panel/Panel';
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../actions/cards';
import * as panelActions from '../actions/panels';

export const Panels = ({ items, addCards, addPanel, deletePanel, deleteCards, changeCards, changePanel, reorderCards }) => {
	const onDragEnd = result => {
    const { source, destination } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }
    reorderCards({
      source,
      destination
    });
	};
	
	return (
	<React.Fragment>
		<DragDropContext onDragEnd={onDragEnd}>
			{items.map((item,index) => (
			<Panel {...item} 
				key={index}
				addCard={addCards} 
				addPanel={addPanel} 
				deletePanel={deletePanel}
				deleteCards={deleteCards}
				changeCards={changeCards}
				changePanel={changePanel}
				panelIndex={index}
			/>))
			}
		</DragDropContext>
		<Panel
			addCard={addCards} 
			addPanel={addPanel} 
		/>
	</React.Fragment>
	)
}

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(cardActions, dispatch),
	...bindActionCreators(panelActions, dispatch),
})

export default connect(({ cards }) => cards, mapDispatchToProps)(Panels);