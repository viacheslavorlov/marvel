import Skeleton from "../components/skeleton/Skeleton";
import {Spinner} from "../components/spinner/spinner";
import {ErrorMessage} from "../components/ErrorMessage/ErrorMessage";

const setContent = (process,Component, data) => {
	switch (process) {
		case 'waiting':
			return <Skeleton/>;
			break;
		case 'loading':
			return <Spinner/>;
			break;
		case 'confirmed':
			return <Component char={data}/>;
			break;
		case 'error':
			return <ErrorMessage/>;
			break;
		default:
			throw new Error('Unexpected process state');
	}
}

export default setContent;