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
		<button className={isVisible ? "add" : "add hide"}>
			<ion-icon name="add"></ion-icon>
		</button>
	);
};

export default FAB;
