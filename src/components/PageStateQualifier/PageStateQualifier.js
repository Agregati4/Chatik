import { useSelector } from "react-redux";
import Preloader from "../Preloader/Preloader";

function PageStateQualifier(props) {
  const { isPageReady } = useSelector(state => state.isPageReady);
  console.log(isPageReady)

  return (
    <>
      {
        isPageReady ?
        props.children :
        <Preloader />
      }
    </>
  )
}

export default PageStateQualifier;