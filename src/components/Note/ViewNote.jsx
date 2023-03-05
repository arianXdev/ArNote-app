import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";

import { getNote, editNote } from "../../services/notesService";

import { NoteContext } from "../../context/NoteContext";

import { toast } from "react-hot-toast";
import "./ViewNote.css";

const ViewNote = () => {
	const { noteId } = useParams();
	const navigate = useNavigate();
	const [note, setNote] = useImmer({});
	const [previousNote, setPreviousNote] = useState({});

	const { setNotes, setFavoriteNotes, setNoteId, handleDelete } = useContext(NoteContext);

	const handleESC = (e) => (e.key === "Escape" ? navigate("/notes") : null);

	useEffect(() => {
		window.addEventListener("keydown", handleESC);
		return () => window.removeEventListener("keydown", handleESC);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: noteData } = await getNote(noteId);
				setNote(noteData);
				setPreviousNote(noteData);

				setNoteId(noteId);
			} catch (err) {
				console.log(err.message);
			}
		};

		fetchData();
	}, []);

	const handleDone = async () => {
		// If the note hasn't had any changes and was the same
		if (note === previousNote) navigate("/notes");
		else {
			const { data: updatedNote, status, statusText } = await editNote(note, noteId);
			if (status === 200 && statusText === "OK") {
				toast.success("Saved!");

				updatedNote.isFavorite
					? setFavoriteNotes((draft) => {
							const noteIndex = draft.findIndex((n) => n.id === updatedNote.id); // get the index of updated note
							draft[noteIndex] = { ...updatedNote };
					  })
					: setNotes((draft) => {
							const noteIndex = draft.findIndex((n) => n.id === updatedNote.id); // get the index of updated note
							draft[noteIndex] = { ...updatedNote };
					  });

				navigate("/notes");
			}
		}
	};

	return (
		<div className="view animate__animated animate__fadeIn">
			<div className="view__box">
				<textarea
					className="view__body"
					value={note.body}
					onChange={(e) =>
						setNote((draft) => {
							draft.body = e.target.value;
						})
					}
				></textarea>

				<button onClick={handleDone} className="view__btn">
					<ion-icon name="checkmark"></ion-icon>
					<span>Done</span>
				</button>

				<button onClick={handleDelete} className="view__delete-btn">
					<ion-icon name="trash"></ion-icon>
				</button>
			</div>

			<div className="bg-blur" onClick={() => navigate("/notes")}></div>
		</div>
	);
};

export default ViewNote;
