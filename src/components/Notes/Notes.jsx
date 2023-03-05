import { useContext } from "react";

import { NoteContext } from "../../context/NoteContext";
import { Note, EmptyWarning } from "..";

import "./Notes.css";

const Notes = ({ notes }) => {
	const { categories } = useContext(NoteContext);

	return (
		<section className="notes">
			{notes.length > 0 ? (
				notes.map((note) => <Note key={note.id} note={note} color={categories.find((category) => note.category === category.id).color} />)
			) : (
				<EmptyWarning />
			)}
		</section>
	);
};

export default Notes;
