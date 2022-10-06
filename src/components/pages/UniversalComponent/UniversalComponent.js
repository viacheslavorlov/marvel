import {useParams, Link, useLocation} from "react-router-dom";
import useMarvelService from "../../../services/UseMarvelService";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import setContent from "../../../utils/setContent";

const SingleItem = () => {
	const {id} = useParams();
	const {pathname} = useLocation();
	const [item, setItem] = useState(null);
	const {getComics, getCaracter, clearError, process, setProcess} = useMarvelService();

	const getItemInState = (item) => {
		setItem(item);
	}


	useEffect(() => {
		clearError();
		(pathname.match('comics') ? getComics(id) : getCaracter(id))
			.then(getItemInState)
			.then(() => setProcess('confirmed'));
	}, [id]);

	// const errorMesage = error ? <NoMatch/> : null;
	// const spinner = loading ? <Spinner/> : null;
	// const content = !(!item || error || loading) ? <View pathname={pathname} item={item}/> : null;

	return (
		<>
			{/* OLD LOGIC*/}
			{/*{errorMesage}*/}
			{/*{spinner}*/}
			{/*{content}*/}
			{/* NEW LOGIC*/
				setContent(process, () => <View item={item} pathname={pathname}/>)
			}

		</>

	)
}

const View = ({item, pathname}) => {
	const {thumbnail, name, title, description, pageCount, language, price} = item;
	const imgXY = pathname.match('comics') ? {height: '450px', width: '300px'} : {height: '300px', width: '300px'}
	return (
		<>
		<Helmet>
			<meta
				name="description"
				content={item?.title || item.name}
			/>
			<title>{item?.title || item.name}</title>
		</Helmet>
		<div className="single-comic">
			<img src={thumbnail} alt={title || name} style={imgXY}/>
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title || name}</h2>
				<p className="single-comic__descr">{description ? item.description: 'There are no' +
					' description yet!'}</p>
				{pageCount ? <p className="single-comic__descr">Total pages: {pageCount || "no info"}</p> : null}
				{language ? <p className="single-comic__descr">Language: {language || "unknown"}</p> : null}
				{price ? <div className="single-comic__price">Price: {price}$</div> : null}
			</div>
			<Link to={`${pathname.match('comics') ? '/comics' : '/'}`} className="single-comic__back">Back to all</Link>
		</div>
		</>
	)
}

export default SingleItem;