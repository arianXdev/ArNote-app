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
	handleAddCategory: () => {},
	handleEditCategory: () => {},
	handleDeleteCategory: () => {},
});
