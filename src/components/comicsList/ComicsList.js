import './comicsList.scss';
import useMarvelService from "../../services/UseMarvelService";
import React, {createRef, useEffect, useRef, useState} from "react";
import ComicsListItem from "./ComicsListItem";
import {Spinner} from "../spinner/spinner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const ComicsList = (props) => {
	const {loading, error, getAllComicses} = useMarvelService();
	const [offset, setOffset] = useState(2);


	const [comicses, setComicses] = useState([]);

	const setComicsesInState = (newComicses) => {
		setComicses([...comicses, ...newComicses]);
	}

	const getComicses = () => {
		setOffset(offset + 9);
		getAllComicses(offset)
			.then(setComicsesInState)
	}

	const onSelect = (e) => { // активный элемент
		const allComicsesItem = document.querySelectorAll('.comics__item');
		allComicsesItem.forEach(item => item.classList.remove('comics__item_selected'));
		e.target.parentElement.parentElement.classList.add('comics__item_selected');
	}

	useEffect(() => {
		getComicses(offset);
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
	const content = formContent();

	return (
		<div className="comics__list">
			<ul className="comics__grid">
				{
					<TransitionGroup component={null} >
						{content}
					</TransitionGroup>
				}
				{error ? <ErrorMessage/> : null}
				{loading ? <Spinner/> : null}
			</ul>
			<button className="button button__main button__long">
				<div className="inner" onClick={() => getComicses(offset)}>load more</div>
			</button>
		</div>
	)
}

export default ComicsList;