import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types'; 
import Button from '../Button/Button';
import closePng from '../../assets/close.png';
import addPng from '../../assets/add.png';
import Card from '../Card/Card';
import './addform.scss';

const AddForm = ({ isEmpty, addCard, panelIndex, addPanel }) => {
	const [editMode, setEditMode] = useState(false);
	const [text, setText] = useState('');

	const textareaRef = useRef(null);

	useEffect(()=>{
		if(textareaRef.current)
		textareaRef.current.focus()
	},[editMode]);

	const Add = () => {
		if(isEmpty && text.trim().length) {
			addCard(panelIndex, text);
			setText('');
		}
		else {
			if(text.trim().length)
			{
				addPanel(text);
				setText('');
				setEditMode(false)
			}
		}
	}

	return (<React.Fragment>	
	{editMode ? (<div className='add-form'>	
		<div className='add-form__input'>		
			<Card>
				<textarea 
					rows="3" 
					ref={textareaRef} 
					value={text}
					placeholder={isEmpty ? 'Введіть назву карточки': 'Введіть назву панелі'}
					onChange={(e)=>setText(e.target.value)}
				/>
			</Card>
			<div className='add-form__bottom'>
				<Button onClick={Add}>
					{isEmpty ? 'Добавити карточку' : 'Добавити панель'}
				</Button>
				<img src={closePng} alt='close' onClick={setEditMode.bind(this,false)}/>
			</div>			
			{text.trim().length ? <></> :<span className='error-message'>Поле не може бути пустим</span>}
		</div>
	</div>)
	: (
		<div className='panel__bottom'>
			 <div className='panel__bottom-add-btn'>
					<img src={addPng} alt='add'/>
					<span onClick={setEditMode.bind(this,true)} >{isEmpty ? 'Добавити карточку' : 'Добавити панель'}</span>
			 </div> 
			</div>	
	)}
	</React.Fragment>)
	
};

AddForm.propTypes = {
	isEmpty: PropTypes.array,
	addCard: PropTypes.func.isRequired,
	addPanel: PropTypes.func.isRequired,
	panelIndex: PropTypes.number
};

export default AddForm;