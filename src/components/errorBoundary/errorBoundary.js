import {Component} from "react";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

class ErrorBoundary extends Component {
	state = {
		error: false
	}

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
		this.setState({
			error: true
		})
	}

	render() {
		if (this.state.error) {
			return(
				<div>
					<h2>Something went wrong!</h2>
					<ErrorMessage/>
				</div>
		)
		}
		return this.props.children;

	}
}

export default ErrorBoundary;