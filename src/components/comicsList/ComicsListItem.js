import React from 'react';
import {Link} from "react-router-dom";

const ComicsListItem = ({comics, onComicsSelected, onSelect, id}) => {
	return (
		<li id={id} className="comics__item" onClick={(e) => {
			onComicsSelected(comics.id);
			onSelect(e);
		}}>
			<Link to={`/comics/${comics.id}`}>
				<img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
				<div className="comics__item-name">{comics.title}</div>
				<div className="comics__item-price">{comics.price} $</div>
			</Link>
		</li>
	);
};

export default ComicsListItem;
