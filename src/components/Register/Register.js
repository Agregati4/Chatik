import { useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import AuthForm from '../AuthForm/AuthForm';
import '../Header/Header.css';
import FormValidation from '../../customFunctions/FormValidation';
import { useSignUpMutation } from '../../store/Api/api.SignUpAndIn/api.SignUpAndIn';
import { useActions } from '../../store/Hooks/useActions';
import { createRef } from 'react';
import HandleSignIn from '../../customFunctions/HandleSignIn';

function Register() {
  const navigate = useNavigate();
  const formRef = createRef();
  const { handleInputChange, isFormValid, values, errors } = FormValidation(
    formRef, { "name-input": "", "email-input": "", "password-input": "" }, { "name-input": "", "email-input": "", "password-input": "" }
  );
  const [ signUp ] = useSignUpMutation();
  const { signErrorMessageSetted, registerButtonTextSetted } = useActions();
  const { handleSignIn } = HandleSignIn();

  function handleSubmit(e) {
    e.preventDefault();

    registerButtonTextSetted('Регистрация...');

    handleSignUp({ name: values['name-input'], email: values['email-input'], password: values['password-input'] });
  }

  function handleSignUp(data) {
    signUp(data)
    .unwrap()
    .then(() => {
      handleSignIn(data);
    })
    .catch((err) => {
      if (err.status === 400) {
        return signErrorMessageSetted('Пользователь с таким email уже существует');
      }

      if (err.status === 500) {
        return signErrorMessageSetted('На сервере произошла ошибка');
      } else {
        return signErrorMessageSetted('Произошла ошибка');
      }
    })
    .finally(() => {
      registerButtonTextSetted('Зарегистрироваться');
    })
  }

  function handleNavigateToSignin() {
    navigate('/signin');
    signErrorMessageSetted('');
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
          onSubmit={ handleSubmit }
        />
        <div className="register__underform-text-container">
          <p className="register__text">Уже зарегистрированы?</p>
          <span onClick={ handleNavigateToSignin } className="register__button">Войти</span>
        </div>
      </div>
    </section>
  )
}

export default Register;