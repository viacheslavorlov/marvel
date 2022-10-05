import "./formFind.scss";
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {Formik, ErrorMessage, Field, Form} from "formik";
import useMarvelService from "../../services/UseMarvelService";
import {Link} from "react-router-dom";

const FormFind = () => {
	const [charName, setCharName] = useState('')
	const [character, setCharacter] = useState(null);
	const [charNotFound, setCharNotFound] = useState(false);
	const {getCaracterByName} = useMarvelService();

	useEffect(() => {

	}, [character]);

	return (
		<>
			<div className={'form'}>
				<h1>Or find a character by name:</h1>
				<br/>
				<Formik
					initialValues={{name: ''}}
					validationSchema={Yup.object({
							name: Yup.string()
								.min(3, 'Must be 3 characters or more')
								.required('The field is required')
						}
					)}
					onSubmit={(values) => {
						setCharacter(null)
						setCharNotFound(false)
						getCaracterByName(values.name)
							.then(res => {
								setCharacter(res);
								setCharNotFound(false)
							})
							.catch(setCharNotFound(true));

					}}>
					<Form component={'div'}>
						<Field
							className="form__input"
							name="name"
							placeholder="Enter character name"
							// value={charName}
							// onChange={(e) => {
							// 	setCharName(e.target.value)
							// 	getCaracterByName(e.target.value)
							// }}
						/>
						<button type="submit"
						        className={'button button__main'}>
							<div className="inner">FIND</div>
						</button>
						<ErrorMessage name="name" className="form__error" component="div"/>
					</Form>
				</Formik>
				<br/>
				{
					character ? (
						<div className="form__success">
							<div className="form__success__message">There is! Visit {character.name} page?</div>
							<button className="button button__secondary">
								<div className="inner">
									<Link to={`/character/${character.id}`}>TO PAGE</Link>
								</div>

							</button>
						</div>) : null
				}
				{
					charNotFound ?
						<div className="form__not-found">The character was not found. Check name and try again.</div> : null
				}
			</div>
		</>
	);
};

export default FormFind;
