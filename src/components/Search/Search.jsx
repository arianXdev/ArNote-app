import { useContext } from "react";

import { NoteContext } from "../../context/NoteContext";
import styles from "./Search.module.css";

const Search = () => {
	const { handleSearchNote, searchInputRef } = useContext(NoteContext);

	return (
		<div className={styles.Search}>
			<ion-icon name="search-outline"></ion-icon>
			<input type="search" className={styles.SearchInput} placeholder="Search" onChange={(e) => handleSearchNote(e.target.value)} ref={searchInputRef} />
		</div>
	);
};

export default Search;
