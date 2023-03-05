import { useContext } from "react";

import { NoteContext } from "../../context/NoteContext";
import { Note } from "..";

import "./Favorites.css";

const Favorites = ({ favoriteNotes }) => {
	const { categories } = useContext(NoteContext);

	return (
		<section className={favoriteNotes.length > 0 ? "favorites" : "favorites hidden"}>
			<h2 className="favorites__title">Favorites</h2>
			<div className="favorites__body">
				{favoriteNotes.map((note) => (
					<Note key={note.id} note={note} color={categories.find((category) => note.category === category.id).color} />
				))}
			</div>
		</section>
	);
};

export default Favorites;
