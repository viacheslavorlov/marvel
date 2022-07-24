import './charInfo.scss';
import {useEffect, useState} from "react";
import MarvelService from "../../services/MarvelService";
import {Spinner} from "../spinner/spinner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from 'prop-types';


const View = ({char}) => {
	console.log('char-info', char)
	let {description} = char;
	const {name, thumbnail, homepage, wiki} = char; //переменные из объекта персонажа
	let {comics} = char;
	const newComics = (comics.length >= 10) ? comics.slice(0, 10) : comics;

	const listOfComices = newComics.map((item, i) => {

		return (
			<li className="char__comics-item" key={i}>
				<a href={item['resourceURI']}>{item.name}</a>
			</li>
		);
	});
	const styleMe = (comics.length > 0) ? {display: 'block'} : {display: 'none'};

	let fitObj;
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		fitObj = {
			objectFit: 'contain'
		}
	}

	if (description === '') {
		description = `The description of ${name} is not written yet!`;
	}


	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} style={fitObj} alt={name}/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list" style={styleMe}>
				{!newComics.length ? `There is no comics with ${name}!` : null}
				{listOfComices}
			</ul>
		</>
	)
}

const CharInfo = ({charId}) => {
	console.log(charId);

	const [char, setChar] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);


	const marvelService = new MarvelService();

	const onCharloaded = (char) => {
		setChar(char);
		setLoading(false);
		setError(false);
	};

	const onError = () => {
		setLoading(false);
		setError(true);
	};

	const updateChar = (charId) => {
		if (!charId) {
			return;
		}
		setLoading(true);
		marvelService
			.getCaracter(charId)
			.then(onCharloaded)
			.catch(onError)
	};

	useEffect(() => {
		updateChar(charId);
		return updateChar;
	}, [charId]);






	const skeleton = char || loading || error ? null : <Skeleton/>;
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !char) ? <View char={char}/> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}




CharInfo.propTypes = {
	charId: PropTypes.number
}


export default CharInfo;