import { Navigate, Routes, Route } from "react-router-dom";
import UserBookings from "./pages/user/UserBookings.jsx";
import UserLayout from "./layouts/UserLayout.jsx"
import Practice from "./pages/Practice.jsx"
import AddBooking from "./pages/user/AddBooking.jsx";
import EditBooking from "./pages/user/EditBooking.jsx";
import NormLayout from "./layouts/NormLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import EditProfile from "./pages/user/EditProfile.jsx";

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<span>Home Page</span>} />
      <Route path="/login" element={<NormLayout><Login /></NormLayout>} />
      <Route path="/register" element={<NormLayout><Register /></NormLayout>} />
      <Route path="/userbookings" element={<UserLayout><UserBookings /></UserLayout>} />
      <Route path="/editprofile" element={<UserLayout><EditProfile /></UserLayout>} />
      <Route path="/addbooking" element={<UserLayout><AddBooking /></UserLayout>} />
      <Route path="/editbooking/:id_booking" element={<UserLayout><EditBooking /></UserLayout>} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/*" element={<Navigate t o="/" />} />
    </Routes>
  )
}

export default AppRoutes
