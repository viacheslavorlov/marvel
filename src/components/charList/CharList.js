import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import React, {useEffect, useRef, useState} from "react";
import MarvelService from "../../services/MarvelService";
import PropTypes from "prop-types";
import {Spinner} from "../spinner/spinner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";


const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [fullCharListLoaded, setFullCharListLoaded] = useState(false);

	const marvelCharsService = new MarvelService();

	useEffect(() => {
		onRequest();
	}, []);

	const onLoadCharacters = (chars) => {
		let ended = false;
		if (chars.length < 9) {
			ended = true;
		}

		setCharList(charList => [...charList, ...chars]);
		setLoading(loading => false);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setFullCharListLoaded(ended);
		console.log(chars);
		console.log(charList);
	}

	const onError = () => {
		setError(true);
		setLoading(loading => false);
	}

	const onRequest = (off) => {
		console.log('not scroll')
		onCharListLoading();
		marvelCharsService
			.getAllCaracters(off)
			.then(onLoadCharacters)
			.catch(onError);
	}

	const onCharListLoading = () => {
		setNewItemLoading(true);
	}
		//! Нужно разобраться как сделать скролл в реакте на
	// const updateAllChars = (offset) => {
	// 	onCharListLoading();
	// 	marvelCharsService
	// 		.getAllCaracters(offset)
	// 		.then(onLoadCharacters)
	// 		.catch(onError);
	// }

	// function onRequestByScroll(off, list) {
	// 	if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
	// 		onRequest(off + list.length);
	// 		console.log('scroll');
	// 	}
	// }
	//
	//
	// useEffect(() => {
	// 	window.addEventListener('scroll', () => onRequestByScroll(offset, charList.length));
	// 	return () => window.removeEventListener('scroll', onRequestByScroll);
	// }, []);

	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.onRequestByScroll);
	// }

	const formCharList = () => {
		return charList.map(item => {
			return <CharLIstElement char={item} key={item.id} onCharSelected={props.onCharselected}/>
		});
	}
	let display = fullCharListLoaded ? {display: 'none'} : {display: 'block'}
	let finalMessage = <div style={{margin: '0 auto', gridColumn: '1 / span 3'}}>NO MORE CHARACTERS LEFT</div>

	return (
		<div className="char__list">
			<ul className="char__grid">
				{loading ? <Spinner/> : null}
				{error ? <ErrorMessage/> : null}
				{formCharList()}
				{fullCharListLoaded ? finalMessage : null}
			</ul>
			<button
				className="button button__main button__long"
				onClick={() => onRequest(offset)}
				style={display}
				disabled={newItemLoading}>
				<div className="inner">load more</div>
			</button>

		</div>
	)

}

const CharLIstElement = (props) => {
	const selectedRef = useRef(null);


	const selectByClick = () => {
		console.log(selectedRef.current);
		if (document.querySelectorAll('.char__item_selected')) {
			document.querySelectorAll('.char__item_selected').forEach(item => {
				item.classList.remove('char__item_selected');
			});
		}
		selectedRef.current.classList.add('char__item_selected');
	}


	const {thumbnail, name, id} = props.char;
	let fitObj;
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		fitObj = {
			objectFit: 'contain'
		};
	}
	return (
		<li className="char__item" ref={selectedRef}
		    onClick={
			    () => {
				    props.onCharSelected(id);
				    selectByClick();
			    }
		    }>
			<img src={thumbnail} style={fitObj} alt={name}/>
			<div className="char__name">{name}</div>
		</li>
	)

}

CharList.propTypes = {
	onCharselected: PropTypes.func.isRequired
}

export default CharList;

