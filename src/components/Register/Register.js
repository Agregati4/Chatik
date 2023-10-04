import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import AuthForm from '../AuthForm/AuthForm';
import '../Header/Header.css';
import FormValidation from '../FormValidation/FormValidation';

function Register(props) {
  const navigate = useNavigate();
  const formRef = React.createRef();
  const { handleInputChange, isFormValid, values, errors } = FormValidation(
    formRef, { "name-input": "", "email-input": "", "password-input": "" }, { "name-input": "", "email-input": "", "password-input": "" }
  );

  function handleSubmit(e) {
    e.preventDefault();

    props.setSignButtonTexts(state => {
      return { ...state, regText: 'Регистрация...' }
    })

    props.handleSignUp({ name: values['name-input'], email: values['email-input'], password: values['password-input'] });
  }

  return (
    <section className="register">
      <div className="register__container">
        <img src={ logo } className="logo" alt="Логотип" />
        <h1 className="register__title">Добро пожаловать!</h1>
        <AuthForm
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
          <p className="register__text">Уже зарегистрированы?</p>
          <span onClick={ () => navigate('/signin') } className="register__button">Войти</span>
        </div>
      </div>
    </section>
  )
}

export default Register;