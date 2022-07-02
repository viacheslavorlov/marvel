import './charInfo.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import {Spinner} from "../spinner/spinner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {

	state = {
		char: null,
		loading: false,
		error: false
	}

	marvelService = new MarvelService();

	onCharloaded = (char) => {
		this.setState({
			char,
			loading: false,
			error: false
		});
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		});
	}

	updateChar = () => {
		const {charId} = this.props;
		if (!charId) {
			return;
		}
		this.setState({
			loading: true
		})
		this.marvelService
			.getCaracter(charId)
			.then(this.onCharloaded)
			.catch(this.onError)
	}

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}


	render() {
		const {char, loading, error} = this.state;
		const skeleton = char || loading || error ? null : <Skeleton/>;
		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error || !char) ? <View char={this.state.char}/> : null;

		return (
			<div className="char__info">
				{skeleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		)
	}
}


const View = ({char}) => {
	let {description} = char;
	const {name, thumbnail, homepage, wiki} = char; //переменные из объекта персонажа
	let {comics} = char;
	const newComics = (comics.length >= 10) ? comics.slice(0, 10) : comics;

	const listOfComices = newComics.map((item, i) => {

		return (
			<li className="char__comics-item" key={i}>
				<a href={item['resourceURI']}>{item.name}</a>
			</li>
		);
	});
	const styleMe = (comics.length > 0) ? {display: 'block'} : {display: 'none'};

	let fitObj;
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		fitObj = {
			objectFit: 'contain'
		}
	}

	if (description === '') {
		description = `The description of ${name} is not written yet!`;
	}


	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} style={fitObj} alt={name}/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics" style={styleMe}>Comics:</div>
			<ul className="char__comics-list">
				{!newComics.length ? `There is no comics with ${name}!` : null}
				{listOfComices}
			</ul>
		</>
	)
}


export default CharInfo;