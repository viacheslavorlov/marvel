import './singleChar.scss';
import {useParams, Link} from "react-router-dom";
import useMarvelService from "../../../services/UseMarvelService";
import {useEffect, useState} from "react";
import {Spinner} from '../../spinner/spinner'
import {NoMatch} from "../index";

const SingleCaracter = () => {

	const {charId} = useParams();


	const [char, setChar] = useState(null);
	const {getCaracter, clearError, loading, error} = useMarvelService();

	const getCharInState = (char) => {
		setChar(char);
	}


	useEffect(() => {
		clearError();
		getCaracter(charId)
			.then(getCharInState)
	}, [charId]);

	const errorMesage = error ? <NoMatch/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(!char || error || loading) ? <View char={char}/> : null;

	return (
		<>
			{errorMesage}
			{spinner}
			{content}
		</>

	)
}

const View = ({char}) => {
	const {thumbnail, name, description, pageCount, language, price} = char;
	return (
		<div className="single-comic">
			<img src={thumbnail} alt={name} className="single-comic__img"/>
			<div className="single-comic__info">
				<h2 className="single-comic__name">{name}</h2>
				<p className="single-comic__descr">{description ? char.description: 'There are no' +
					' description yet!'}</p>

			</div>
			<Link to="/" className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleCaracter;