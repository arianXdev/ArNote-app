import "./Note.css";

const Note = ({ note: { isFavorite, id, category, body, date } }) => {
	return (
		<article className={isFavorite ? "note favorite" : "note"} id={id} category={category}>
			<div className="note__body">{body}</div>
			<div className="note__date">
				{date.month} {date.day}, {date.year}
			</div>

			<button className="note__edit-btn">
				<ion-icon name="create-outline"></ion-icon>
			</button>

			<button className="note__star-btn">
				<ion-icon name="star"></ion-icon>
			</button>
		</article>
	);
};

export default Note;
