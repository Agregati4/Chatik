/* eslint-disable eqeqeq */
import * as React from 'react';
import './OptionsContainer.css';
import ChatMenu from '../ChatMenu/ChatMenu';
import OptionsField from '../OptionsField/OptionsField';
import Preloader from '../Preloader/Preloader';

function OptionsContainer(props) {
  return (
    <section className="options-container">
      {
        props.isPageReady ?
        <>
          <ChatMenu
            title="Настройки"
            optionsButton={ true }
            optionsButtonText="Выйти из беседы"
            isOptionButtonRed={ true }
          />
          <OptionsField
            handleUpdateRoomTitle={ props.handleUpdateRoomTitle }
            roomId={ props.roomId }
          />
        </> :
        <>
          <ChatMenu
            title="Настройки"
            optionsButton={ true }
            optionsButtonText="Выйти из беседы"
            isOptionButtonRed={ true }
          />
          <Preloader />
        </>
      }
    </section>
  );
}

export default OptionsContainer;