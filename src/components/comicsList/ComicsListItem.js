import React from 'react';
import uw from "../../resources/img/UW.png";

const ComicsListItem = ({comics}) => {
	return (
		<li className="comics__item">
			<a href="#">
				<img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
				<div className="comics__item-name">{comics.title}</div>
				<div className="comics__item-price">{comics.price} $</div>
			</a>
		</li>
	);
};

export default ComicsListItem;
