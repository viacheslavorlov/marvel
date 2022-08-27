import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from "../../services/UseMarvelService";
import {useEffect, useState} from "react";
import ComicsListItem from "./ComicsListItem";

const ComicsList = () => {
    const {loading, error, getAllComicses} = useMarvelService();
    const [offset, setOffset] = useState(201);

    const [comicses, setComicses] = useState([])

    const setComicsesInState = (newComicses) => {
        setComicses([...comicses, ...newComicses]);
    }

    const getComicses = () => {
        setOffset(offset + 9);
        getAllComicses(offset)
            .then(setComicsesInState)
    }

    useEffect(() => {
        getComicses(offset);
    }, []);

    console.log(offset)

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comicses.map(item => {
                    return <ComicsListItem comics={item}  key={item.id}/>
                })}
            </ul>
            <button className="button button__main button__long">
                <div className="inner" onClick={() => getComicses(offset)}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;