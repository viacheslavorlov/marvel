import {useHttp} from "../hooks/http.hook";

const useMarvelService  = () => {
	const {loading, request, error, clearError} = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = '1e344272825c1465c008c37081a94a35';
	const _baseOffset = 210;


	const getAllCaracters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
		return res.data.results.map(_transformCaracter);
	}

	const getCaracter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?limit=9&offset=210&apikey=${_apiKey}`);
		return _transformCaracter(res.data.results[0]);
	}

	const getAllComicses = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}comics?limit=9&offset=${offset}&apikey=${_apiKey}`);
		console.log(res.data.results.map(item => _transformComics(item)));
		return res.data.results.map(item => _transformComics(item));
	}

	const _transformComics = (comics) => {
		return {
			titel: comics.titel,
			id: comics.id,
			thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
			description: comics.description,
			pageCount: comics.pageCount,
			price: comics.prices[0].price,
			url: comics.urls[0].url
		}
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
	return {loading, error, getCaracter, getAllCaracters, getAllComicses, clearError};
}

export default useMarvelService;