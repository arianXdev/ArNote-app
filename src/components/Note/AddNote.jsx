import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { NoteContext } from "../../context/NoteContext";

import "./AddNote.css";

const AddNote = () => {
	const { categories } = useContext(NoteContext);
	const navigate = useNavigate();

	const [addBtnState, setAddBtnState] = useState(false);

	const addBtnClass = classNames({
		add__btn: true,
		"add__btn--extend": addBtnState,
	});

	const handleESC = (e) => (e.key === "Escape" ? navigate("/notes") : null);

	useEffect(() => {
		window.addEventListener("keydown", handleESC);
		return () => window.removeEventListener("keydown", handleESC);
	}, []);

	return (
		<div className="add animate__animated animate__fadeIn">
			<div className="add__box">
				<textarea
					className="add__body"
					// value={note.body}
					// onChange={(e) =>
					// setNote((draft) => {
					// draft.body = e.target.value;
					// })
					// }
				></textarea>

				<div className={addBtnClass} style={{ width: addBtnState ? "590px" : "110px" }} onClick={() => setAddBtnState((prevState) => !prevState)}>
					<span className="add__btn-text">
						Add
						<ion-icon name="chevron-forward-outline"></ion-icon>
					</span>

					<ul
						className="add__categories"
						style={
							addBtnState
								? { width: "100%", visibility: "visible", userSelect: "auto", pointerEvents: "auto", transition: "all 0.5s ease-out", transitionDelay: ".3s" }
								: { opacity: "0", visibility: "hidden", width: "0" }
						}
					>
						{categories.map((c) => (
							<li
								key={c.id}
								onClick={(e) => {
									e.stopPropagation();
									console.log(c.name);
								}}
								style={{
									transition: `all ${parseInt(c.id)}s ease-in`,
								}}
							>
								<button className="add__categories-btn">{c.name}</button>
								<div className={`add__bar add__bar--${c.color}`}></div>
							</li>
						))}
					</ul>
				</div>

				<button className="add__delete-btn" onClick={() => navigate("/notes")}>
					<ion-icon name="trash"></ion-icon>
				</button>
			</div>

			<div className="bg-blur" onClick={() => navigate("/notes")}></div>
		</div>
	);
};

export default AddNote;
