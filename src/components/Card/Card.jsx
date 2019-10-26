import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import { Draggable } from "react-beautiful-dnd";
import EditForm from '../EditForm/EditForm';
import './card.scss';

const Card = ({ children, text, changeCards, panelIndex, cardIndex }) => {

const [edit, setEditMode] = useState(false);

return ( cardIndex !== undefined ? (
	edit ? 
		<EditForm 
			text={text} 
			changeCardPanel={changeCards} 
			setEditMode={setEditMode} 
			panelIndex={panelIndex}
			cardIndex={cardIndex}
			edit={edit}
		/> 
		:
		<div>
			<Draggable
				draggableId={`card-${panelIndex}-${cardIndex}`}
				index={cardIndex}
			>			
			{ (provided) => (
				<div
						className='card'
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						onDoubleClick={()=>setEditMode(true)}
					>
					{children}
				
					</div>
				)
			}
			</Draggable>
	  </div>
  ) : 
	(
	<div className ='card' onDoubleClick={()=>setEditMode(true)} >
		{edit ? 
		<EditForm 
			text={text} 
			changeCardPanel={changeCards} 
			setEditMode={setEditMode} 
			panelIndex={panelIndex}
			cardIndex={cardIndex}
			edit={edit}
		/> 
		: 
		children}
	</div>
	))
}

Card.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	text: PropTypes.string,
	panelIndex: PropTypes.number,
	cardIndex: PropTypes.number
};

export default Card;