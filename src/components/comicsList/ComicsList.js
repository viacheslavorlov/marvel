import './comicsList.scss';
import useMarvelService from "../../services/UseMarvelService";
import React, {createRef, useEffect, useMemo, useState} from "react";
import ComicsListItem from "./ComicsListItem";
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

const ComicsList = (props) => {
	const [offset, setOffset] = useState(2);
	const [comicses, setComicses] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const {getAllComicses, process, setProcess} = useMarvelService();

	const setComicsesInState = (newComicses) => {
		setComicses([...comicses, ...newComicses]);
	}

	const getComicses = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		setOffset(() => offset + 8);
		getAllComicses(offset)
			.then(setComicsesInState)
			.then(() => setProcess('confirmed'));
	}

	const onSelect = (e) => { // активный элемент
		const allComicsesItem = document.querySelectorAll('.comics__item');
		allComicsesItem.forEach(item => item.classList.remove('comics__item_selected'));
		e.target.parentElement.parentElement.classList.add('comics__item_selected');
	}

	useEffect(() => {
		getComicses(offset, true);
	}, []);




	const formContent = () => {
		return comicses.map((item, index) => {
			const nodeRef = createRef()
			return (
				<CSSTransition key={item.id + index}
				               classNames={"comics__transition"}
				               timeout={1000}
				               nodeRef={nodeRef}
				               >
					<div ref={nodeRef}>
						<ComicsListItem id={item.id + index} comics={item}
						                onComicsSelected={props.onComicsSelected} onSelect={onSelect}/>
					</div>

				</CSSTransition>
			)

		});
		}
	const content = useMemo(() => setContent(process, () => formContent(), newItemLoading), [newItemLoading, process]);

	return (
		<div className="comics__list">
			<ul className="comics__grid">
				{
					<TransitionGroup component={null} >
						{content}
					</TransitionGroup>
				}
				{/*{error ? <ErrorMessage/> : null}*/}
				{/*{loading ? <Spinner/> : null}*/}
			</ul>
			<button className="button button__main button__long">
				<div className="inner" onClick={() => getComicses(offset)}>load more</div>
			</button>
		</div>
	)
}

export default ComicsList;