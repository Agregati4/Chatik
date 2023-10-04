import './Popup.css';

function Popup(props) {
  return (
    <div className={ `popup ${ props.isOpen ? "popup_opened" : "" }` }>
      <div className="popup__box">
        <button type="button" onClick={ props.handleClose } className="popup__button"></button>
        { props.children }
      </div>
    </div>
  );
}

export default Popup;