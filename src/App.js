import { Search, Note } from "./components";

import "./App.css";

const App = () => {
	return (
		<div className="App">
			<aside className="sidebar">Sidebar</aside>

			<main className="Main">
				<div className="container">
					<Search />
					<section className="favorites hidden">
						<h2 className="favorites__title">Favorites</h2>
						<div className="favorites__body"></div>
					</section>

					<section className="notes"></section>
				</div>
			</main>
		</div>
	);
};

export default App;
