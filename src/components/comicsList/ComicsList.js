import './comicsList.scss';
import useMarvelService from "../../services/UseMarvelService";
import {useEffect, useState} from "react";
import ComicsListItem from "./ComicsListItem";
import {Spinner} from "../spinner/spinner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";


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

	const content = comicses.map((item, index) => {
		return <ComicsListItem id={item.id + index} comics={item} key={item.id + index}
		                       onComicsSelected={props.onComicsSelected} onSelect={onSelect}/>
	});


	return (
		<div className="comics__list">
			<ul className="comics__grid">
				{error ? <ErrorMessage/> : null}
				{content}
				{loading ? <Spinner/> : null}
			</ul>
			<button className="button button__main button__long">
				<div className="inner" onClick={() => getComicses(offset)}>load more</div>
			</button>
		</div>
	)
}

export default ComicsList;