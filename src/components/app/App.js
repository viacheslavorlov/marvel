import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import {useState} from "react";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import ComicsList from "../comicsList/ComicsList";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import SingleComic from "../singleComic/SingleComic";
import AppBanner from "../appBanner/AppBanner";


const App = () => {


	const [selectedChar, setSelectedChar] = useState(null);
	const [selectedComics, setSelectedComics] = useState(null);

	const onCharSelected = (id) => {
		setSelectedChar(id);
	}

	const onComicsSelected = (id) => {
		setSelectedComics(id);
	}

	return (
		<div className="app">
			<AppHeader/>
			<AppBanner/>
			<main>
				<ErrorBoundary>
					<RandomChar/>
				</ErrorBoundary>
				<div className="char__content">
					<ErrorBoundary>
						<CharList onCharselected={onCharSelected}/>
					</ErrorBoundary>
					<ErrorBoundary>
						<CharInfo charId={selectedChar}/>
					</ErrorBoundary>
				</div>
				<ComicsList onComicsSelected={onComicsSelected}/>
				<SingleComic id={selectedComics}/>
				<img className="bg-decoration" src={decoration} alt="vision"/>
			</main>
		</div>
	)
}

export default App;