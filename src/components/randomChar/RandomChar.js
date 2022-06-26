import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";

class RandomChar extends Component {
	constructor(props) {
		super(props);
		this.updateCharacter();/* ! нельзя вызывать в  конструкторе */
	}

	state = {
		char: {}
	}

	marvelService = new MarvelService();

	onCarloaded = (char) => {
		this.setState({char});
	}

	updateCharacter = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.marvelService
			.getCaracter(id)
			.then(this.onCarloaded);
	}
	newDescription = (description, name) => {
		if (description) {
			if (description.length > 20) {
				description = description.slice(0, 49) + '...';
			}
		} else if (description === '') {
			description = `The description of ${name} is not written yet!`;
		}
		return description;
	}

	render() {

		let {name, description, thumbnail, homepage, wiki} = this.state.char;
		if (description) {
			if (description.length > 20) {
				description = description.slice(0, 49) + '...';
			}
		} else if (description === '') {
			description = `The description of ${name} is not written yet!`;
		}

		return (
			<div className="randomchar">
				<div className="randomchar__block">
					<img src={thumbnail} alt="Random character" className="randomchar__img"/>
					<div className="randomchar__info">
						<p className="randomchar__name">{name}</p>
						<p className="randomchar__descr">
							{description}
						</p>
						<div className="randomchar__btns">
							<a href={homepage} className="button button__main">
								<div className="inner">HOMEPAGE</div>
							</a>
							<a href={wiki} className="button button__secondary">
								<div className="inner">WIKI</div>
							</a>
						</div>
					</div>
				</div>
				<div className="randomchar__static" onClick={this.updateCharacter}>
					<p className="randomchar__title">
						Random character for today!<br/>
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
				</div>
			</div>
		)
	}
}

export default RandomChar;