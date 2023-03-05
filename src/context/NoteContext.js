import { createContext } from "react";

export const NoteContext = createContext({
	setNotes: () => {},
	setFavoriteNotes: () => {},
});
