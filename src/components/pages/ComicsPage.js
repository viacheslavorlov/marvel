import React, {useState} from 'react';
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

const ComicsPage = () => {

	const [selectedComics, setSelectedComics] = useState(null);

	const onComicsSelected = (id) => {
		setSelectedComics(id);
	}

	return (
		<>
			<ComicsList onComicsSelected={onComicsSelected}/>
			<SingleComic id={selectedComics}/>
		</>
	);
};

export default ComicsPage;
