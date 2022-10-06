import {useHttp} from "../hooks/http.hook";

const useMarvelService  = () => {
	const {request, clearError, process, setProcess} = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = '1e344272825c1465c008c37081a94a35';
	const _baseOffset = 210;


	const getAllCaracters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
		return res.data.results.map(_transformCaracter);
	}

	const getCaracter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
		return _transformCaracter(res.data.results[0]);
	}

	const getAllComicses = async (offset = 4510) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apiKey}`);
		return res.data.results.map(_transformComics);
	}

	const getComics = async (id) => {
		if (id) {
			const res = await request(`${_apiBase}comics/${id}?&apikey=${_apiKey}`);
			return _transformComics(res.data.results[0]);
		}
	}


	const getCaracterByName = async (name) => {
	    if (name) {
			const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`)
		    return _transformCaracter(res.data.results[0])
	    }
	}

	const _transformComics = (comics) => {
		let language;
		if (comics.textObjects.length === 0) {
			language = 'en-us';
		} else {
			language = comics.textObjects[0].language;
		}
		return {
			language: language,
			title: comics.title,
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
			name: char.name,
			id: char.id,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,

		}
	}
	return {process, setProcess, getCaracter, getAllCaracters, getAllComicses, getComics, getCaracterByName, clearError};
}

export default useMarvelService;