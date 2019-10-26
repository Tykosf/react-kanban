import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import savePng from '../../assets/save.png';
import './editForm.scss';

const EditForm = ({ text, panelIndex, cardIndex, changeCardPanel, setEditMode, edit }) => {
	const [inputText, setInputText] = useState(text);
	const inputRef = useRef(null);
	
	useEffect(()=>{
		if(inputRef.current)
		inputRef.current.focus()
	},[edit]);

	const handleChange = (event) => {
		setInputText(event.target.value);
	}

	const ChangeOne = () => {
		if(panelIndex !== undefined  && cardIndex !== undefined){
			changeCardPanel(panelIndex, cardIndex, inputText); 
			setEditMode(false);
		}
		else {
			changeCardPanel(panelIndex, inputText);
			setEditMode(false); 
		}
	}
	
	return (
		<div className='edit-form' >
			<input type='text' value={inputText} onChange={handleChange} ref={inputRef} />
			<img 
				src={savePng}
				onClick={ChangeOne}
				alt='save'
			/>
		</div>
	)	
}

EditForm.propTypes = {
	text: PropTypes.string,
	setEditMode: PropTypes.func,
	changeCardPanel: PropTypes.func,
	panelIndex: PropTypes.number,
	cardIndex: PropTypes.number,
	edit: PropTypes.bool
};


export default EditForm;