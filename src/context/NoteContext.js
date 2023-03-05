import { createContext } from "react";

export const NoteContext = createContext({
	categories: [],
	setNotes: () => {},
	setFavoriteNotes: () => {},
});
