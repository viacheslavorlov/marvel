import React from 'react';

const ComicsListItem = ({comics, onComicsSelected}) => {
	return (
		<li className="comics__item" onClick={() => onComicsSelected(comics.id)}>
			<a href={comics.urls}>
				<img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
				<div className="comics__item-name">{comics.title}</div>
				<div className="comics__item-price">{comics.price} $</div>
			</a>
		</li>
	);
};

export default ComicsListItem;
