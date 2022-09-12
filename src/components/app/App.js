import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
// import TestComponent from "../testComponent/testComponent";
import {MainPage, ComicsPage} from "../pages";


const App = () => {


	return (
		<BrowserRouter>
			<div className="app">
				{/*<TestComponent/>*/}
				<AppHeader/>
				<AppBanner/>
				<main>
					<Routes>
						<Route path="/" element={<MainPage/>}/>
						<Route path="/comics" element={<ComicsPage/>}/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	)
}

export default App;