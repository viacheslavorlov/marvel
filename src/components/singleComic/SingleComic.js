import './singleComic.scss';
import useMarvelService from "../../services/UseMarvelService";
import {useEffect, useState} from "react";
import Skeleton from "../skeleton/Skeleton";

const SingleComic = ({id}) => {
    const [comics, setComics] = useState(null);
    const {getComics} = useMarvelService();

    const getComicsInState = (comics) => {
        setComics(comics);
    }

    // useEffect(() => {
    //     getComics(id)
    //         .then(getComicsInState)
    // }, []);

    useEffect(() => {
        getComics(id)
            .then(getComicsInState)
    }, [id]);

    return (
        comics ?
        <div className="single-comic">
            <img src={comics.thumbnail} alt={comics.title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comics.title}</h2>
                <p className="single-comic__descr">{comics.description ? comics.description: 'There are no' +
                    ' description yet!'}</p>
                <p className="single-comic__descr">Total pages: {comics.pageCount}</p>
                <p className="single-comic__descr">Language: {comics.language || "unknown"}</p>
                <div className="single-comic__price">Price: {comics.price}$</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </div> : <Skeleton/>
    )
}

export default SingleComic;