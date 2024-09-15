import { Navigate, Routes, Route } from "react-router-dom";
import UserBookings from "./pages/UserBookings.jsx";
import UserLayout from "./layouts/UserLayout.jsx"
import Practice from "./pages/Practice.jsx"
import AddBooking from "./pages/AddBooking.jsx";
import ViewBooking from "./pages/ViewBooking.jsx";

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<span>Home Page</span>} />
      <Route path="/userbookings" element={<UserLayout><UserBookings /></UserLayout>} />
      <Route path="/addbooking" element={<UserLayout><AddBooking /></UserLayout>} />
      <Route path="/viewbooking/:id_booking" element={<UserLayout><ViewBooking /></UserLayout>} />
      <Route path="/editbooking/*" element={<UserLayout><ViewBooking /></UserLayout>} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/*" element={<Navigate t o="/" />} />
    </Routes>
  )
}

export default AppRoutes
