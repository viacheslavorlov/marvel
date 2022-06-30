import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }
    marvelCharsService = new MarvelService();

    onLoadCharacters = (chars) => {
        this.setState({
            charList: [...chars],
            loading: false,
            error: false
        });
    }

    updateAllChars = () => {
        this.marvelCharsService
            .getAllCaracters()
            .then(this.onLoadCharacters)
            .catch(e=> console.log(e))
    }

    componentDidMount() {
        this.updateAllChars();
    }

    formCharList = () => {
        return this.state.charList.map(item => {
            return <CharLIstElement char={item} key={item.id} onCharSelected={this.props.onCharselected}/>
        });
    }


    render() {
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.formCharList()}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharLIstElement = (item) => {
    const {thumbnail, name, id} = item.char;
    let fitObj;
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        fitObj = {
            objectFit: 'contain'
        }
    }
    return (
        <li className="char__item" onClick={() => item.onCharSelected(id)}>
            <img src={thumbnail} style={fitObj} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;