import './charList.scss';
import React, {createRef, useEffect, useMemo, useRef, useState} from "react";
import useMarvelService from "../../services/UseMarvelService";
import PropTypes from "prop-types";
import {Spinner} from "../spinner/spinner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const setContent = (process, Component, newItemLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner/>;
		case 'loading':
			return newItemLoading ? <Component/> : <Spinner/>;
		case 'confirmed':
			return <Component/>;
		case 'error':
			return <ErrorMessage/>;
		default:
			throw new Error('Unexpected process state');
	}
}


const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [fullCharListLoaded, setFullCharListLoaded] = useState(false);
	const {getAllCaracters, process, setProcess} = useMarvelService();


	let loadingPrevent = false;

	useEffect(() => {
		if (!loadingPrevent) {
			onRequest(offset, true);
			loadingPrevent = true;
		}
	}, []);

	const onLoadCharacters = async (chars) => {
		//* динамический импорт с помощью деструктуризации (обязательна асинхронная функция)
		// const {logger, secondLog} = await import('./logger');

		let ended = false;
		if (chars.length < 9) {
			ended = true;
		}
		setCharList(charList => [...charList, ...chars]);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setFullCharListLoaded(ended);

	}

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		// console.log('not scroll')
		getAllCaracters(offset)
			.then(onLoadCharacters)
			.then(() => setProcess('confirmed'));
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
	// 	if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1)
	// { onRequest(off + list.length); console.log('scroll'); } }   useEffect(() => { window.addEventListener('scroll',
	// () => onRequestByScroll(offset, charList.length)); return () => window.removeEventListener('scroll',
	// onRequestByScroll); }, []);

	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.onRequestByScroll);
	// }

	const formCharList = (list) => {
		console.log('render characters')
		return list.map(item => {
			const nodeRef = createRef();
			return (
				<CSSTransition
					key={item.id}
					timeout={1000}
					nodeRef={nodeRef}
					classNames="char__transition"
				>
					<div ref={nodeRef}>
						<CharLIstElement char={item} onCharSelected={props.onCharselected}/>
					</div>
				</CSSTransition>
			)
		});
	}
	let display = fullCharListLoaded ? {display: 'none'} : {display: 'block'}
	let finalMessage = <div style={{margin: '0 auto', gridColumn: '1 / span 3'}}>NO MORE CHARACTERS LEFT</div>
	// const errorMessage = error ? <ErrorMessage/> : null;
	// const spinner = loading && !newItemLoading ? <Spinner/> : null;

	const chars = useMemo(() => {
		return setContent(process, () => formCharList(charList), newItemLoading)
	}, [charList]);

	return (
		<div className="char__list">

			<ul>
				<TransitionGroup className="char__grid" component={'div'}>
					{chars}
				</TransitionGroup>
			</ul>
			{fullCharListLoaded ? finalMessage : null}
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
		    tabIndex={0}
		    onFocus={() => {
			    props.onCharSelected(id);
			    selectByClick();
		    }}
		    onClick={() => {
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

