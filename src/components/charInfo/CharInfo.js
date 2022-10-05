import './charInfo.scss';
import {useEffect, useState, memo} from "react";
import useMarvelService from "../../services/UseMarvelService";
import {Spinner} from "../spinner/spinner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import FormFind from "../form/FormFind";


function ComponentCompare(prevProps, nextProps) {
	console.log('prevProps', prevProps.char.id);
	console.log('nextProps', nextProps.char.id);

	return prevProps.char.id === nextProps.char.id;
}

const View = memo(({char}) => {
	console.log('CarInfo render complete')
	// console.log('char-info', char);
	let {description} = char;
	const {name, thumbnail, homepage, wiki} = char; //переменные из объекта персонажа
	let {comics} = char;
	const newComics = (comics.length >= 10) ? comics.slice(0, 10) : comics;

	const listOfComices = newComics.map((item, i) => {
	const {resourceURI} = item;
		return (
			<li className="char__comics-item" key={i}>
				<Link to={`/comics/${resourceURI.slice(43)}`}>{item.name}</Link>
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
}, ComponentCompare);

const CharInfo = ({charId}) => {

	const [char, setChar] = useState(null);

	const {loading, error, getCaracter, clearError} = useMarvelService();

	const onCharloaded = (char) => {
		setChar(char);
	};


	// console.log(char);
	const updateChar = (charId) => {
		clearError();
		if (!charId) {
			return;
		}
		getCaracter(charId)
			.then(onCharloaded)
	};

	useEffect(() => {
		updateChar(charId);
		// return updateChar;
	}, [charId]);


	const skeleton = char || loading || error ? null : <Skeleton/>;
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !char) ? <View char={char}/> : null;

	console.log("CharInfo render")

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
};


CharInfo.propTypes = {
	charId: PropTypes.number
}


export default CharInfo;