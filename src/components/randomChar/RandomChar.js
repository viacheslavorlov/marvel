import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";
import MarvelService from "../../services/MarvelService";
import {Spinner} from "../spinner/spinner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

const RandomChar = () => {

	const [char, setChar] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const marvelService = new MarvelService();

	const onCharloaded = (charfromserver) => {
		setChar(charfromserver);
		setLoading(false);
		setError(false);
	}

	const onError = () => {
		setLoading(false);
		setError(true);
	}

	const updateCharacter = () => {
		setLoading(true);
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		marvelService
			.getCaracter(id)
			.then(onCharloaded)
			.catch(onError)
	}

	useEffect(() => {
		updateCharacter();
	}, []);


	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error) ? <View char={char}/> : null;

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

const View = ({char}) => {
	let {name, description, thumbnail, homepage, wiki} = char;
	let fitObj;
	if (description) {
		if (description.length > 20) {
			description = description.slice(0, 49) + '...';
		}
	} else if (description === '') {
		description = `The description of ${name} is not written yet!`;
	}
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		fitObj = {
			objectFit: 'contain'
		}
	}
	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" style={fitObj} className="randomchar__img"/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">HOMEPAGE</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">WIKI</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;