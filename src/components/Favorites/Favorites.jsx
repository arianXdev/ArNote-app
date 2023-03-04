import { Note } from "..";

import "./Favorites.css";

const Favorites = ({ favoriteNotes }) => {
	return (
		<section className={favoriteNotes.length > 0 ? "favorites" : "favorites hidden"}>
			<h2 className="favorites__title">Favorites</h2>
			<div className="favorites__body">
				{favoriteNotes.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</div>
		</section>
	);
};

export default Favorites;
