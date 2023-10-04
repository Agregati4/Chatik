import * as React from 'react';
import './CheckboxContact.css';
import Userbar from '../Userbar/Userbar';

function CheckboxContact(props) {
  const [ checkboxState, setCheckboxState ] = React.useState(false);

  function handleCheckbox() {
    setCheckboxState(state => {
      state = !state;
      return state;
    });
  }

  return (
    <>
      <label className="checkbox-contact" htmlFor="checkbox-contact">
        <input id="checkbox-contact" type="checkbox" className="checkbox-contact__checkbox" onChange={ handleCheckbox } checked={ checkboxState ? true : false } />
        <label htmlFor="checkbox-contact" className="checkbox-contact__bar">
          <Userbar />
        </label>
      </label>
    </>
  )
}

export default CheckboxContact;