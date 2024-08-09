import {Navigate, Routes, Route} from "react-router-dom";
import Normal from './layouts/Normal'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutUsPage from "./pages/AboutUsPage";

const AppRoutes = () => {
	return(
		<Routes>
            <Route path="/" element={<Normal><HomePage /></Normal>} />
            <Route path="/reviews" element={<Normal><ReviewsPage /></Normal>} />
            <Route path="/gallery" element={<Normal><GalleryPage /></Normal>} />
            <Route path="/login" element={<Normal><Login /></Normal>} />
            <Route path="/about-us" element={<Normal><AboutUsPage /></Normal>} />
            <Route path="/signup" element={<Normal><Signup /></Normal>} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
	)
};

export default AppRoutes;