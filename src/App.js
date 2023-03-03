import { Search } from "./components";

import "./App.css";

const App = () => {
	return (
		<div className="App">
			<div className="container">
				<Search />

				<main className="Main">
					<section className="favorites hidden">
						<h2 className="favorites__title">Favorites</h2>
						<div className="favorites__body"></div>
					</section>

					<section className="notes">All Notes</section>
				</main>
			</div>

			<aside className="sidebar"></aside>
		</div>
	);
};

export default App;
