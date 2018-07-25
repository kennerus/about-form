import React from 'react';
import PropTypes from 'prop-types';

const FormElement = props => {
  const {labelText, inputType, inputID, inputName, inputPlaceholder, inputValue, inputValidate, inputChange, inputError} = props;

 if (inputType === 'submit') {
   return (
     <div className="form__element">
       <input
         type={inputType}
         className="input input_submit"
         id={inputID}
         name={inputName}
         value={inputValue}
       />
     </div>
   );
 } else {
   return (
     <div className="form__element">
       <label className="label" htmlFor={inputID}>{labelText}</label>

       <input
         type={inputType}
         className={`input ${inputError}`}
         id={inputID}
         name={inputName}
         placeholder={inputPlaceholder}
         onChange={inputChange}
         onBlur={inputValidate}
         value={inputValue}
       />
     </div>
   );
 }
};

FormElement.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputID: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  inputChange: PropTypes.string,
  inputValidate: PropTypes.string,
  inputPlaceholder: PropTypes.string
};

export default FormElement;
