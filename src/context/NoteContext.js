import { createContext } from "react";

export const NoteContext = createContext({
	categories: [],
	setNotes: () => {},
	setAllNotes: () => {},
	setFavoriteNotes: () => {},
	setNoteId: () => {},
	handleDelete: () => {},
	handleSearchNote: () => {},
	clearSearch: () => {},
});
