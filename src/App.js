import { useEffect } from "react";
import { useImmer } from "use-immer";

import { Search, Favorites, Notes, FAB, Sidebar } from "./components";
import { Outlet, useNavigate } from "react-router";

import { getAllNotes, getAllCategories, deleteNote } from "./services/notesService";

import { NoteContext } from "./context/NoteContext";

import { Toaster, toast } from "react-hot-toast";

import { RED } from "./helpers/colors";
import "./App.css";

const App = () => {
	const [noteId, setNoteId] = useImmer();
	const [notes, setNotes] = useImmer([]);
	const [favoriteNotes, setFavoriteNotes] = useImmer([]);
	const [categories, setCategories] = useImmer([]);

	const navigate = useNavigate();

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

	const handleDelete = async () => {
		toast((t) => (
			<div className="toast-container">
				<span>
					Do you want to <b style={{ color: RED }}>delete</b> this note?
				</span>
				<button className="btn btn--cancel" onClick={() => toast.dismiss(t.id)}>
					Cancel
				</button>
				<button className="btn btn--confirm" onClick={handleDeleteNote}>
					Yes!
				</button>
			</div>
		));

		const handleDeleteNote = async () => {
			const { status } = await deleteNote(noteId);

			toast.dismiss();
			if (status === 200) {
				try {
					// Get all notes from server
					const { data: notesData } = await getAllNotes();
					// Get all categories from server
					const { data: categoriesData } = await getAllCategories();

					setFavoriteNotes(notesData.filter((note) => note.isFavorite === true));
					setNotes(notesData.filter((note) => note.isFavorite === false));
					setCategories(categoriesData);

					navigate("/notes");
					toast.success("Deleted!");
				} catch (err) {
					console.log(err.message);
					toast.error("Couldn't delete it!");
				}
			}
		};
	};

	return (
		<NoteContext.Provider value={{ categories, setNotes, setFavoriteNotes, setNoteId, handleDelete }}>
			<div className="App">
				<Outlet />

				<Sidebar />
				<main className="Main">
					<div className="container">
						<Search />
						<Favorites favoriteNotes={favoriteNotes} />
						<Notes notes={notes} />
					</div>
				</main>

				<FAB />
				<Toaster />
			</div>
		</NoteContext.Provider>
	);
};

export default App;
