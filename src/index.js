import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import { ViewNote, AddNote, Notes } from "./components";

import "./index.css";
import "animate.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/notes" />} />
				<Route path="/notes/*" element={<App />}>
					<Route path=":noteId" element={<ViewNote />} />
					<Route path="add" element={<AddNote />} />
					<Route path="category/:categoryId" element />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
