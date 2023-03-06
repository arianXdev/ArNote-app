import { useEffect, useRef } from "react";
import { useImmer } from "use-immer";

import { Search, Favorites, Notes, FAB, Sidebar } from "./components";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { getAllNotes, getAllCategories, deleteNote } from "./services/notesService";

import { NoteContext } from "./context/NoteContext";
import _ from "lodash";

import { Toaster, toast } from "react-hot-toast";

import { RED } from "./helpers/colors";
import "./App.css";

const App = () => {
	const [noteId, setNoteId] = useImmer();
	const [notes, setNotes] = useImmer([]);
	const [allNotes, setAllNotes] = useImmer([]);
	const [categorizedNotes, setCategorizedNotes] = useImmer([]);
	const [favoriteNotes, setFavoriteNotes] = useImmer([]);
	const [categories, setCategories] = useImmer([]);

	const { categoryId } = useParams();

	const searchInputRef = useRef();

	const navigate = useNavigate();

	const fetchData = async () => {
		try {
			// Get all notes from server
			const { data: notesData } = await getAllNotes();
			// Get all categories from server
			const { data: categoriesData } = await getAllCategories();

			setFavoriteNotes(notesData.filter((note) => note.isFavorite === true));

			if (categoryId) {
				setCategorizedNotes(notesData.filter((note) => note.category === categoryId));
				setNotes(notesData);
			} else {
				setNotes(notesData.filter((note) => note.isFavorite === false));
				setAllNotes(notesData);
			}

			setCategories(categoriesData);
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setCategorizedNotes(notes.filter((note) => note.category === categoryId));
	}, [categoryId]);

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
					setAllNotes(notesData);
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

	const handleSearchNote = _.debounce((query) => {
		if (!query) {
			fetchData();
			setFavoriteNotes(allNotes.filter((note) => note.isFavorite === true));
			return setNotes(allNotes.filter((note) => note.isFavorite === false));
		}

		setFavoriteNotes([]);
		setNotes(() => allNotes.filter((n) => n.body.toLowerCase().includes(query.toLowerCase())));
	}, 1000);

	const clearSearch = () => {
		searchInputRef.current.value = "";
		handleSearchNote("");
	};

	return (
		<NoteContext.Provider value={{ categories, setNotes, setAllNotes, setFavoriteNotes, setNoteId, handleDelete, handleSearchNote, searchInputRef, clearSearch }}>
			<div className="App">
				<Outlet />

				<Sidebar />
				<main className="Main">
					<div className="container">
						<Search />
						<Favorites favoriteNotes={favoriteNotes} />
						<Notes notes={categoryId ? categorizedNotes : notes} />
					</div>
				</main>

				<FAB />
				<Toaster />
			</div>
		</NoteContext.Provider>
	);
};

export default App;
