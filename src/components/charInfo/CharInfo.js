import './charInfo.scss';
import {useEffect, useState, memo, useMemo} from "react";
import useMarvelService from "../../services/UseMarvelService";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import setContent from "../../utils/setContent";


function ComponentCompare(prevProps, nextProps) {
	console.log('prevProps', prevProps.data.id);
	console.log('nextProps', nextProps.data.id);

	return prevProps.data.id === nextProps.data.id;
}

const View = memo(({data}) => {
	console.log('CarInfo render complete')
	// console.log('char-info', char);
	let {description} = data;
	const {name, thumbnail, homepage, wiki} = data; //переменные из объекта персонажа
	let {comics} = data;
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

	//* fsm logic
	const {process, getCaracter, clearError, setProcess} = useMarvelService();

	const onCharloaded = (char) => {
		setChar(char);
	};


	// console.log(char);
	const updateChar = (charId) => {
		if (!charId) {
			return;
		}
		clearError();
		getCaracter(charId)
			.then(onCharloaded)
			//* fsm logic
			.then(() => setProcess('confirmed'));
	};

	useEffect(() => {
		updateChar(charId);
	}, [charId]);


	//* old logic
	// const skeleton = char || loading || error ? null : <Skeleton/>;
	// const errorMessage = error ? <ErrorMessage/> : null;
	// const spinner = loading ? <Spinner/> : null;
	// const content = !(loading || error || !char) ? <View char={char}/> : null;

	console.log("CharInfo render")

	//* fsm logic
	const content = useMemo(() => {
		return setContent(process, View, char)
	}, [char]);
	return (
		<div className="char__info">
			{content}
			{/*{skeleton}*/}
			{/*{errorMessage}*/}
			{/*{spinner}*/}
			{/*{content}*/}
		</div>
	)
};


CharInfo.propTypes = {
	charId: PropTypes.number
}


export default CharInfo;