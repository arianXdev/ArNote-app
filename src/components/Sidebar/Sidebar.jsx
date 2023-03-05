import { useContext } from "react";
import { Link } from "react-router-dom";

import { NoteContext } from "../../context/NoteContext";
import "./Sidebar.css";

const Sidebar = () => {
	const { categories } = useContext(NoteContext);
	return (
		<aside className="sidebar">
			<nav className="sidebar__categories">
				{categories.map((category) => (
					<Link key={category.id} className={`sidebar__item ${category.color}`} name={category.name} to={`/notes/category/${category.name.toLowerCase()}`}></Link>
				))}
			</nav>
		</aside>
	);
};

export default Sidebar;
