import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Register/Register.css';
import '../Header/Header.css';
import logo from '../../images/logo.svg';
import AuthForm from '../AuthForm/AuthForm';
import FormValidation from '../FormValidation/FormValidation';

function Login(props) {
  const navigate = useNavigate();
  const formRef = React.createRef();
  const { handleInputChange, isFormValid, values, errors } = FormValidation(
    formRef, { "email-input": "", "password-input": "" }, { "email-input": "", "password-input": "" }
  );

  function handleSubmit(e) {
    e.preventDefault();

    props.setSignButtonTexts(state => {
      return { ...state, loginText: 'Вход...' }
    })

    props.handleSignIn({ email: values['email-input'], password: values['password-input'] });
  }

  function handleNavigateToSignup() {
    navigate('/signup');
    props.setSignErrorMessage('');
  }

  return (
    <section className="register">
      <div className="register__container">
        <img src={ logo } className="logo" alt="Логотип" />
        <h2 className="register__title">Рады видеть!</h2>
        <AuthForm
          login={ true }
          handleInputChange={ handleInputChange }
          isFormValid={ isFormValid }
          values={ values }
          errors={ errors }
          formRef={ formRef }
          signErrorMessage={ props.signErrorMessage }
          onSubmit={ handleSubmit }
          signButtonTexts={ props.signButtonTexts }
        />
        <div className="register__underform-text-container">
          <p className="register__text">Ещё не зарегистрированы?</p>
          <span onClick={ handleNavigateToSignup } className="register__button">Регистрация</span>
        </div>
      </div>
    </section>
  )
}

export default Login;