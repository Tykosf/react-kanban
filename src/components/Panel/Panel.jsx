import React, { useState } from 'react';
import { Droppable } from "react-beautiful-dnd";
import PropTypes from 'prop-types'; 
import './panel.scss';
import Card from '../Card/Card';
import closePng from '../../assets/close.png';
import AddForm from '../AddForm/AddForm';
import EditForm from '../EditForm/EditForm';


const Panel = ({ title, cards, addPanel, addCard, deletePanel, deleteCards, panelIndex, changeCards, changePanel }) => {
	const [change, setChanges] = useState(false);

	return cards ? (
		<Droppable type="CARDS" droppableId={`panel-${panelIndex}`}>
		{provided => (
		  <div className='panel'  {...provided.droppableProps}	ref={provided.innerRef}>
				{title && (change ? 
				<EditForm 
					edit={change} 
					panelIndex={panelIndex} 
					text={title} 
					setEditMode={setChanges} 
					changeCardPanel={changePanel}
				/> 
				:(<div className='panel-title' onDoubleClick={()=>setChanges(true)}>
					<b>{title}</b>
					<img onClick={()=>deletePanel(panelIndex)} src={closePng} alt='close'/>
				</div>)
				)}
				{Boolean(cards.length) && (<div className='panel__items'>
					{cards.map((card,index) =>
						<Card key={index} text={card} changeCards={changeCards} panelIndex={panelIndex} cardIndex={index}>
								<span>{card}</span>
								<img className='close' onClick={()=>deleteCards(panelIndex, index)} src={closePng} alt='close'/>	
						</Card>
					)}
				{provided.placeholder}
			</div>)}
			<AddForm 
				isEmpty={cards} 
				addCard={addCard} 
				addPanel={addPanel} 
				panelIndex={panelIndex}
			/>
		</div>
	)}
	</Droppable>)
	:
	( <div className={'panel'}>
			<AddForm 
				isEmpty={cards} 
				addCard={addCard} 
				addPanel={addPanel} 
				panelIndex={panelIndex}
			/>
    </div>
  );
};

Panel.propTypes = {
	cards: PropTypes.array,
	title: PropTypes.string,
	addPanel: PropTypes.func,
	deletePanel: PropTypes.func,
	changePanel: PropTypes.func,
	addCard: PropTypes.func,
	deleteCards: PropTypes.func,
	changeCards: PropTypes.func,
	panelIndex: PropTypes.number
};

export default Panel;