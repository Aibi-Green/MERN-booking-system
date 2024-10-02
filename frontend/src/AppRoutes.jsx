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
import Profile from "./pages/user/Profile.jsx";
import EditPassword from "./pages/user/EditPassword.jsx";
import Landing from "./pages/Landing.jsx";

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<NormLayout><Landing /></NormLayout>} />
      <Route path="/login" element={<NormLayout noFooter><Login /></NormLayout>} />
      <Route path="/register" element={<NormLayout noFooter><Register /></NormLayout>} />

      {/* USER BOOKING PAGES */}
      <Route path="/userbookings" element={<UserLayout><UserBookings /></UserLayout>} />
      <Route path="/addbooking" element={<UserLayout><AddBooking /></UserLayout>} />
      <Route path="/editbooking/:id_booking" element={<UserLayout><EditBooking /></UserLayout>} />
      
      {/* USER PROGILE PAGES */}
      <Route path="/profile" element={<UserLayout><Profile /></UserLayout>} />
      <Route path="/editprofile" element={<UserLayout><EditProfile /></UserLayout>} />
      <Route path="/editpassword" element={<UserLayout><EditPassword /></UserLayout>} />

      <Route path="/practice" element={<Practice />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
