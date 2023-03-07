import { useEffect, useRef } from "react";
import { useImmer } from "use-immer";

import { Search, Favorites, Notes, FAB, Sidebar } from "./components";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { getAllNotes, getAllCategories, deleteNote, addCategory } from "./services/NoteService";

import { NoteContext } from "./context/NoteContext";
import _ from "lodash";

import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

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
				setCategorizedNotes(notesData.filter((note) => note.category === parseInt(categoryId)));
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
		setCategorizedNotes(notes.filter((note) => note.category === parseInt(categoryId)));
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

	const handleAddCategory = async () => {
		const inputOptions = new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					blue: "Blue",
					green: "Green",
					yellow: "Yellow",
					gray: "Gray",
					red: "Red",
				});
			}, 1000);
		});

		const { value: color } = await Swal.fire({
			title: "Select the color of category",
			input: "radio",
			inputOptions: inputOptions,
			confirmButtonText: "Next",
			customClass: {
				popup: "popup-custom",
				confirmButton: "confirmButton-custom confirmButton-custom--red",
			},
			inputValidator: (value) => {
				if (!value) {
					return "You need to choose a color!";
				}
			},
		});
		if (color) {
			const { value: name } = await Swal.fire({
				title: "Enter your category name",
				input: "text",
				confirmButtonText: "Create",
				customClass: {
					popup: "popup-custom",
					input: "input-custom",
					confirmButton: "confirmButton-custom confirmButton-custom--blue",
				},
				inputValidator: (value) => {
					if (!value) {
						return "You need to specify the category name!";
					}
				},
			});

			if (color && name) {
				if (categories.length < 5) {
					const { data: newCategory } = await addCategory({ name, color });
					setCategories((draft) => {
						draft.push(newCategory);
					});
				} else {
					Swal.fire({
						icon: "error",
						title: "Sorry :(",
						text: "You can't create more than 5 categories!",
						confirmButtonText: "Really? Alright",
						customClass: {
							popup: "popup-custom",
							confirmButton: "confirmButton-custom confirmButton-custom--blue",
						},
					});
				}
			}
		}
	};

	const handleEditCategory = async () => {
		console.log("edit category");
	};

	const handleDeleteCategory = async () => {
		toast((t) => (
			<div className="toast-container">
				<span>
					Do you want to <b style={{ color: RED }}>delete</b> this note?
				</span>
				<button className="btn btn--cancel" onClick={() => toast.dismiss(t.id)}>
					Cancel
				</button>
				<button className="btn btn--confirm">Yes!</button>
			</div>
		));
	};

	return (
		<NoteContext.Provider
			value={{
				categories,
				handleAddCategory,
				setNotes,
				setAllNotes,
				setFavoriteNotes,
				setNoteId,
				handleDelete,
				handleSearchNote,
				searchInputRef,
				clearSearch,
				handleEditCategory,
				handleDeleteCategory,
			}}
		>
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
