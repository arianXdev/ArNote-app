import { createContext } from "react";

export const NoteContext = createContext({
	categories: [],
	searchInputRef: {},
	setNotes: () => {},
	setAllNotes: () => {},
	setFavoriteNotes: () => {},
	setNoteId: () => {},
	handleDelete: () => {},
	handleSearchNote: () => {},
	clearSearch: () => {},
	handleFavoriteNote: () => {},
	handleAddCategory: () => {},
	handleEditCategory: () => {},
	handleDeleteCategory: () => {},
});
