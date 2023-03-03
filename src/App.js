import { Search } from "./components";

import "./App.css";

const App = () => {
	return (
		<main className="app">
			<aside className="sidebar"></aside>
			<div className="container">
				<Search />
			</div>
		</main>
	);
};

export default App;
