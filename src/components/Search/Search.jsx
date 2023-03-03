import styles from "./Search.module.css";

const Search = () => {
	return (
		<div className="container">
			<div className={styles.Search}>
				<ion-icon name="search-outline"></ion-icon>
				<input type="search" className={styles.SearchInput} placeholder="Search" />
			</div>
		</div>
	);
};

export default Search;
