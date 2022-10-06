export const View = ({data}) => {
    let {name, description, thumbnail, homepage, wiki} = data;
    let fitObj;
    if (description) {
        if (description.length > 20) {
            description = description.slice(0, 49) + '...';
        }
    } else if (description === '') {
        description = `The description of ${name} is not written yet!`;
    }
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        fitObj = {
            objectFit: 'contain'
        }
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" style={fitObj} className="randomchar__img"/>
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
    )
}