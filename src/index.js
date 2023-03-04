import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import { ViewNote } from "./components";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/notes" />} />
				<Route path="/notes" element={<App />}>
					<Route path=":noteId" element={<ViewNote />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
