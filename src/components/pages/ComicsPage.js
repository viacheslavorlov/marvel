import React, {useState} from 'react';
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "./singleComic/SingleComic";
import {Helmet} from "react-helmet";

const ComicsPage = () => {

	const [selectedComics, setSelectedComics] = useState(null);

	const onComicsSelected = (id) => {
		setSelectedComics(id);
	}

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content="List of comics"
				/>
				<title>Comics page</title>
			</Helmet>
			<ComicsList onComicsSelected={onComicsSelected}/>
			<SingleComic id={selectedComics}/>
		</>
	);
};

export default ComicsPage;
