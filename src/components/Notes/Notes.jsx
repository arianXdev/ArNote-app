import { Note, EmptyWarning } from "..";

import "./Notes.css";

const Notes = ({ notes }) => {
	return <section className="notes">{notes.length > 0 ? notes.map((note) => <Note key={note.id} note={note} />) : <EmptyWarning />}</section>;
};

export default Notes;
