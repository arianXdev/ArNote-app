import "./Note.css";

const Note = ({ favorite }) => {
	return (
		<article className={favorite ? "note favorite" : "note"}>
			<div className="note__body">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente hic sed nobis iste ipsum possimus natus pariatur omnis incidunt aliquam?
			</div>

			<div className="note__date">March 3, 2023</div>

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
