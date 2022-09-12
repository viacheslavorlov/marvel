import React from 'react';
import {Link} from "react-router-dom";

const NoMatch = () => {
	return (
		<div>
			<h2 style={{textAlign: 'center'}}>Page not found! Check the address please...</h2>
			<img
				src="https://papik.pro/uploads/posts/2021-09/1631761820_6-papik-pro-p-prikolnie-risunki-marvel-6.jpg"
				alt="Deadpull not found page"
				style={{objectFit: 'contain', marginTop: '30px'}}
			/>
			<Link to="/" style={{display: 'block', margin: '30px auto', textAlign: 'center'}}><button><h1>Back to main page!</h1></button></Link>
		</div>
	);
};

export default NoMatch;
