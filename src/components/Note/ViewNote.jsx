import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useImmer } from "use-immer";

import { getNote, editNote } from "../../services/notesService";

import "./ViewNote.css";

const ViewNote = () => {
	const { noteId } = useParams();
	const navigate = useNavigate();
	const [note, setNote] = useImmer({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: noteData } = await getNote(noteId);
				setNote(noteData);
			} catch (err) {
				console.log(err.message);
			}
		};

		fetchData();
	}, []);

	const handleDone = async () => {
		const { status, statusText } = await editNote(note, noteId);
		if (status === 200 && statusText === "OK") {
			navigate("/notes");
		}
	};

	return (
		<>
			<div className="view">
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
				</div>
			</div>
			<div className="bg-blur"></div>
		</>
	);
};

export default ViewNote;
