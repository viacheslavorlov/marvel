import React from 'react';

const ComicsListItem = ({comics, onComicsSelected, onSelect, id}) => {
	return (
		<li id={id} className="comics__item" onClick={(e) => {
			onComicsSelected(comics.id);
			onSelect(e);
		}}>
			<a href={comics.urls}>
				<img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
				<div className="comics__item-name">{comics.title}</div>
				<div className="comics__item-price">{comics.price} $</div>
			</a>
		</li>
	);
};

export default ComicsListItem;
