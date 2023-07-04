import { Routes, Route, useLocation } from "react-router-dom";
import MovieHall from "./moviehall/MovieHall.jsx";
import Home from "./home/Home.jsx";
import Admin from "./admin/Admin.jsx";
import MovieDetails from "./moviedetails/MovieDetails.jsx";
import AdminRoute from "./auth/AdminRoute";
import UserRoute from "./auth/UserRoute";
import AdminTest from "./AdminTest";
import Login from "./auth/login/Login.jsx";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.key}>
				<Route element={<AdminRoute />}>
					<Route path="/admin" element={<Admin />} />
				</Route>
				<Route element={<UserRoute />}>
					<Route path="/" element={<Home />} />
					<Route path="/test" element={<AdminTest />} />
					<Route path="/booking/:id" element={<MovieHall />} />
					<Route path="/movie/:id" element={<MovieDetails />} />
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</AnimatePresence>
	);
}

export default AnimatedRoutes;
