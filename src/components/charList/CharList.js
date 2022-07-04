import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";


class CharList extends Component {

	state = {
		charList: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 210,        //для изменения offset в запросе на сервер
		fullCharListLoaded: false
	}
	marvelCharsService = new MarvelService();


	onLoadCharacters = (chars) => {
		let ended = false;
		if (chars.length < 9) {
			ended = true;
		}

		this.setState(() => ({
			charList: [...this.state.charList, ...chars],
			loading: false,
			error: false,
			newItemLoading: false,
			offset: this.state.offset + 9,
			fullCharListLoaded: ended
		}));
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false
		})
	}

	onRequest = () => {
		console.log('not scroll')
		this.marvelCharsService
			.getAllCaracters(this.state.offset)
			.then(this.onLoadCharacters)
			.catch(this.onError);
	}

	onCharListLoading = () => {
		this.setState({
			newItemLoading: true
		})
	}

	updateAllChars = () => {
		this.onCharListLoading();
		this.marvelCharsService
			.getAllCaracters()
			.then(this.onLoadCharacters)
			.catch(this.onError);
	}

	onRequestByScroll = () => {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			this.onRequest();
			console.log('scroll');
		}
	}


	componentDidMount() {
		this.updateAllChars();
		window.addEventListener('DOMContentLoaded', (e) => {
			if (e) {
				window.addEventListener('scroll', this.onRequestByScroll);
			}
		})

	}


	componentWillUnmount() {
		window.removeEventListener('scroll', this.onRequestByScroll)
	}

	formCharList = () => {
		return this.state.charList.map(item => {
			return <CharLIstElement char={item} key={item.id} onCharSelected={this.props.onCharselected}/>
		});
	}


	render() {

		let display = this.state.fullCharListLoaded ? {display: 'none'} : {display: 'block'}
		let finalMessage = <div style={{margin: '0 auto', gridColumn: '1 / span 3'}}>NO MORE CHARACTERS LEFT</div>
		return (
			<div className="char__list">
				<ul className="char__grid">
					{this.formCharList()}
					{this.state.fullCharListLoaded ? finalMessage : null}
				</ul>
				<button
					className="button button__main button__long"
					onClick={this.onRequest}
					style={display}
					disabled={this.state.newItemLoading}>
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