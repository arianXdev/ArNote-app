import { useEffect } from "react";
import { useImmer } from "use-immer";

import { Search, Favorites, Notes, FAB } from "./components";

import { getAllNotes, getAllCategories } from "./services/notesService";

import "./App.css";

const App = () => {
	const [notes, setNotes] = useImmer([]);
	const [favoriteNotes, setFavoriteNotes] = useImmer([]);
	const [categories, setCategories] = useImmer([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Get all notes from server
				const { data: notesData } = await getAllNotes();
				// Get all categories from server
				const { data: categoriesData } = await getAllCategories();

				setFavoriteNotes(notesData.filter((note) => note.isFavorite === true));
				setNotes(notesData.filter((note) => note.isFavorite === false));

				setCategories(categoriesData);
			} catch (err) {
				console.log(err.message);
			}
		};

		fetchData();
	}, []);

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

			<FAB />
		</div>
	);
};

export default App;
