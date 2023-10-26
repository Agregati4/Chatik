import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../store/Api/api.SignUpAndIn/api.SignUpAndIn";
import { useActions } from "../store/Hooks/useActions";
import UserValidation from "./UserValidation";

export default function HandleSignIn() {
  const navigate = useNavigate();
  const { isLoggedInSetted, signErrorMessageSetted, loginButtonTextSetted } = useActions();
  const [ signIn ] = useSignInMutation();
  const { handleCurrentUser } = UserValidation();

  function handleSignIn(data) {
    signIn(data)
    .unwrap()
    .then((token) => {
      localStorage.setItem('access', token.access);
      localStorage.setItem('refresh', token.refresh);
      handleCurrentUser();
      isLoggedInSetted(true);
      navigate('/');
    })
    .catch((err) => {
      if (err.status === 401) {
        return signErrorMessageSetted('Вы ввели неправильный логин или пароль');
      }

      if (err.status === 500) {
        return signErrorMessageSetted('На сервере произошла ошибка');
      } else {
        return signErrorMessageSetted('Произошла ошибка');
      }
    })
    .finally(() => {
      loginButtonTextSetted('Войти');
      signErrorMessageSetted('');
    })
  }

  return { handleSignIn };
}