import img from '../../resources/img/Ghost.gif';
import './ErrorMessage.scss';
import {CSSTransition} from "react-transition-group";

export const ErrorMessage = () => {
	return (
		<>
			<img src={img} alt="Error"/>
		</>
	)
}
