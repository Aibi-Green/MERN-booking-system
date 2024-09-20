import { Navigate, Routes, Route } from "react-router-dom";
import UserBookings from "./pages/UserBookings.jsx";
import UserLayout from "./layouts/UserLayout.jsx"
import Practice from "./pages/Practice.jsx"
import AddBooking from "./pages/AddBooking.jsx";
import EditBooking from "./pages/EditBooking.jsx";
import NormLayout from "./layouts/NormLayout.jsx";
import Login from "./pages/Login.jsx";

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<span>Home Page</span>} />
      <Route path="/login" element={<NormLayout><Login /></NormLayout>} />
      <Route path="/userbookings" element={<UserLayout><UserBookings /></UserLayout>} />
      <Route path="/addbooking" element={<UserLayout><AddBooking /></UserLayout>} />
      <Route path="/editbooking/:id_booking" element={<UserLayout><EditBooking /></UserLayout>} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/*" element={<Navigate t o="/" />} />
    </Routes>
  )
}

export default AppRoutes
