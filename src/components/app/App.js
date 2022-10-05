import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
// import TestComponent from "../testComponent/testComponent";
import {Spinner} from "../spinner/spinner";
import {lazy, Suspense} from "react";
import {MainPage} from "../pages";
import UniversalComponent from "../pages/UniversalComponent/UniversalComponent";
// import SingleChar from "../pages/singleChar/SingleCaracter"
// import SingleCaracter from "../pages/singleChar/SingleCaracter";

// const MainPage = lazy(() => import('../pages/MainPage'));
const NoMatch = lazy(() => import('../pages/404'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComic = lazy(() => import('../pages/singleComic/SingleComic'));
const SingleChar = lazy(() => import('../pages/singleChar/SingleCaracter'))
// build 688 KB 14/09  09:48
const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Spinner/>}>
			<div className="app">
				{/*<TestComponent/>*/}
				<AppHeader/>
				<AppBanner/>
				<main>
						<Routes>
							<Route path="/" element={<MainPage/>}/>
							<Route path="/comics" element={<ComicsPage/>}/>
							{/*<Route path="comics/:comicsId" element={<SingleComic/>}/>*/}
							{/*<Route path="/character/:charId" element={<SingleChar/>}/>*/}
							<Route path="comics/:id" element={<UniversalComponent/>}/>
							<Route path="character/:id" element={<UniversalComponent/>}/>
							<Route path="*" element={<NoMatch/>}/>
						</Routes>
				</main>
			</div>
			</Suspense>
		</BrowserRouter>
	)
}

export default App;