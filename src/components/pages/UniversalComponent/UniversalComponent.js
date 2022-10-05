
import {useParams, Link} from "react-router-dom";
import useMarvelService from "../../../services/UseMarvelService";
import {useEffect, useState} from "react";
import {Spinner} from "../../spinner/spinner";
import {NoMatch} from "../index";

const SingleItem = () => {
	const params = useParams();
	console.log(params);
	const [item, setItem] = useState(null);
	const {getComics, getCaracterByName, clearError, loading, error} = useMarvelService();

	const getComicsInState = (item) => {
		setItem(item);
	}


	useEffect(() => {
		clearError();
		getComics(ItemId)
			.then(getComicsInState)
	}, [ItemId]);

	const errorMesage = error ? <NoMatch/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(!item || error || loading) ? <View comics={item}/> : null;

	return (
		<>
			{errorMesage}
			{spinner}
			{content}
		</>

	)
}

const View = ({comics}) => {
	const {thumbnail, title, description, pageCount, language, price} = comics;
	return (
		<div className="single-comic">
			<img src={thumbnail} alt={title} className="single-comic__img"/>
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description ? comics.description: 'There are no' +
					' description yet!'}</p>
				<p className="single-comic__descr">Total pages: {pageCount || "no info"}</p>
				<p className="single-comic__descr">Language: {language || "unknown"}</p>
				<div className="single-comic__price">Price: {price}$</div>
			</div>
			<Link to="/comics" className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleItem;