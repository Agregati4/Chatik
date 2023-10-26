import { useActions } from "../store/Hooks/useActions";

export default function HandleNotification() {
  const { notificationSetted, notificationClosed } = useActions();

  function handleNotification(notificationState) {
    if (notificationState) {
      notificationSetted({ isGood: true, isActive: true, text: 'Успешно!' });
      setTimeout(() => {
        notificationClosed()
      }, 1500);
    } else {
      notificationSetted({ isGood: false, isActive: true, text: 'Ошибка' });
      setTimeout(() => {
        notificationClosed()
      }, 1500);
    }
  }

  return { handleNotification };
}