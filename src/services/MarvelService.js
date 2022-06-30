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

	getAllCaracters = async () => {
		const res = await this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`
		);
		return res.data.results.map(this._transformCaracter);
	}

	getCaracter = async (id) => {
		const res = await this.getResource(
			`${this._apiBase}characters/${id}?limit=9&offset=310&apikey=${this._apiKey}`
		);
		return this._transformCaracter(res.data.results[0]);
	}

	_transformCaracter = (char) => {
		return {
			name:char.name,
			id: char.id,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url
		}
	}

}

export default MarvelService;