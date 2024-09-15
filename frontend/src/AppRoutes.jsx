import { Navigate, Routes, Route } from "react-router-dom";
import UserBookings from "./pages/UserBookings.jsx";
import UserLayout from "./layouts/UserLayout.jsx"
import Practice from "./pages/Practice.jsx"
import AddBooking from "./components/AddBooking.jsx";

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<span>Home Page</span>} />
      <Route path="/userbookings" element={<UserLayout><UserBookings /></UserLayout>} />
      <Route path="/addbookings" element={<AddBooking />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/*" element={<Navigate t o="/" />} />
    </Routes>
  )
}

export default AppRoutes
