import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";

import { Link } from "react-router-dom";
import classNames from "classnames";

import "./Note.css";

const Note = ({ note: { isFavorite, id, category, body, date }, color }) => {
	const { handleFavoriteNote } = useContext(NoteContext);
	const noteClass = classNames({
		note: true,
		[color]: true,
		favorite: isFavorite,
	});

	return (
		<article className={noteClass} id={id} category={category}>
			<div className="note__body">{body}</div>
			<div className="note__date">
				{date.month} {date.day}, {date.year}
			</div>

			<Link to={`/notes/${id}`} className="note__edit-btn">
				<ion-icon name="expand-outline"></ion-icon>
			</Link>

			<button className="note__star-btn" id={id} onClick={handleFavoriteNote}>
				<ion-icon name="star"></ion-icon>
			</button>
		</article>
	);
};

export default Note;
