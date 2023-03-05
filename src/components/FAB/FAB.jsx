import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FAB.css";

const FAB = () => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		window.addEventListener("scroll", listenToScroll);
		return () => window.removeEventListener("scroll", listenToScroll);
	});

	const listenToScroll = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		if (winScroll > 400) isVisible && setIsVisible(false);
		else setIsVisible(true);
	};

	return (
		<Link to="/notes/add" className={isVisible ? "addBtn" : "addBtn hide"}>
			<ion-icon name="add"></ion-icon>
		</Link>
	);
};

export default FAB;
