import {useHttp} from "../hooks/http.hook";

const useMarvelService  = () => {
	const {loading, request, error} = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = '1e344272825c1465c008c37081a94a35';
	const _baseOffset = 210;


	const getAllCaracters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
		return res.data.results.map(this._transformCaracter);
	}

	const getCaracter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?limit=9&offset=310&apikey=${_apiKey}`);
		return _transformCaracter(res.data.results[0]);
	}

	const _transformCaracter = (char) => {
		return {
			name:char.name,
			id: char.id,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}
	return {loading, error, getCaracter, getAllCaracters};
}

export default useMarvelService;