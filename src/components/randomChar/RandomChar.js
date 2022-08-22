import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/UseMarvelService";
import {Spinner} from "../spinner/spinner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {View} from "./View";

const RandomChar = () => {

	const [char, setChar] = useState(null);

	const {loading, error, getCaracter, clearError} = useMarvelService();


	useEffect(() => {
		updateCharacter();
	 }, []);

	const onCharloaded = (char) => {
		setChar(char);
	}


	const updateCharacter = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCaracter(id)
			.then(onCharloaded);
	}


	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !char) ? <View char={char}/> : null;

	return (
		<div className="randomchar">
			{errorMessage}
			{spinner}
			{content}
			<div className="randomchar__static" onClick={updateCharacter}>
				<p className="randomchar__title">
					Random character for today!<br/>
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button className="button button__main">
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
			</div>
		</div>
	)
}

export default RandomChar;