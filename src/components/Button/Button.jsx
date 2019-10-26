import React from 'react';
import PropTypes from 'prop-types'; 
import './button.scss';

const Button = ({ children, onClick }) => (
 <button className='button' onClick={onClick}>{children}</button>
)

Button.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	onClick: PropTypes.func.isRequired
};

export default Button;