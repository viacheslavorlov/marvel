class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = '1e344272825c1465c008c37081a94a35'


	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	}

	getAllCaracters = () => {
		return this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`
		)
	}

	getCaracter = (id) => {
		return this.getResource(
			`${this._apiBase}characters/${id}?limit=9&offset=310&apikey=${this._apiKey}`
		)
	}
}

export default MarvelService;