import ErrorBoundary from "../errorBoundary/errorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import React, {useState} from 'react';

const MainPage = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	const onCharSelected = (id) => {
		setSelectedChar(id);
	}

	return (
		<>
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
				<img className="bg-decoration" src={decoration} alt="vision"/>
			</div>
		</>
	);
};

export default MainPage;

