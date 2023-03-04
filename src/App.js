import { Search, Favorites, Notes } from "./components";

import { useImmer } from "use-immer";

import "./App.css";

const App = () => {
	const [notes, setNotes] = useImmer([]);
	const [favoriteNotes, setFavoriteNotes] = useImmer([]);

	return (
		<div className="App">
			<aside className="sidebar"></aside>
			<main className="Main">
				<div className="container">
					<Search />
					<Favorites favoriteNotes={favoriteNotes} />
					<Notes notes={notes} />
				</div>
			</main>

			<button className="add">
				<ion-icon name="add"></ion-icon>
			</button>
		</div>
	);
};

export default App;
