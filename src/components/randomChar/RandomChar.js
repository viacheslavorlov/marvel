import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/UseMarvelService";
import {View} from "./View";
import setContent from "../../utils/setContent";

const RandomChar = () => {

	const [char, setChar] = useState(null);

	const {getCaracter, clearError, setProcess, process} = useMarvelService();


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
			.then(onCharloaded)
			.then(() => setProcess('confirmed'));
	}

	//* old render logic
	// const errorMessage = error ? <ErrorMessage/> : null;
	// const spinner = loading ? <Spinner/> : null;
	// const content = !(loading || error || !char) ? <View char={char}/> : null;

	return (
		<div className="randomchar">
			{
				//* old render logic
			}
			{/*{errorMessage}*/}
			{/*{spinner}*/}
			{/*{content}*/}

			{
				//* NEW render logic
				setContent(process, View, char)
			}



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