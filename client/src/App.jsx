// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

// import Home from "./pages/Home";
// import EventDetails from "./pages/EventDetails";
// import MyBookings from "./pages/MyBookings";
// import OrganizerDashboard from "./pages/OrganizerDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import StaffCheckIn from "./pages/StaffCheckIn";
// import TicketQR from "./pages/TicketQR";

// import CreateEvent from "./pages/CreateEvent";
// import CreateTickets from "./pages/CreateTickets";

// import Organizations from "./pages/admin/Organizations";

// import AdminEventApproval from "./pages/AdminEventApproval";

// import OrganizerEvents from "./pages/OrganizerEvents";

// import OrganizerEventBookings from "./pages/OrganizerEventBookings";
// import OrganizerEventAnalytics from "./pages/OrganizerEventAnalytics";

// import OrganizerTicketManager from "./pages/OrganizerTicketManager";

// import AdminRefunds from "./pages/AdminRefunds";

// function App() {
//   const role = localStorage.getItem("role");

//   return (
//     <BrowserRouter>
//       <Navbar role={role} />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/events/:eventId" element={<EventDetails />} /> */}
//         <Route path="/events/:id" element={<EventDetails />} />
//         <Route path="/bookings" element={<MyBookings />} />
//         <Route path="/ticket/:bookingId" element={<TicketQR />} />

//         <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/staff/checkin" element={<StaffCheckIn />} />

//         <Route path="/organizer/create-event" element={<CreateEvent />} />
//         <Route
//           path="/organizer/events/:eventId/tickets"
//           element={<CreateTickets />}
//         />

//         <Route path="/admin/organizations" element={<Organizations />} />

//         <Route path="/admin/events/pending" element={<AdminEventApproval />} />

//         <Route path="/organizer/events" element={<OrganizerEvents />} />

//         <Route
//           path="/organizer/events/:eventId/bookings"
//           element={<OrganizerEventBookings />}
//         />

//         <Route
//           path="/organizer/events/:eventId/analytics"
//           element={<OrganizerEventAnalytics />}
//         />

//         <Route
//           path="/organizer/events/:eventId/tickets"
//           element={<OrganizerTicketManager />}
//         />
//         <Route path="/admin/refunds" element={<AdminRefunds />} />

//         <Route path="/staff/check-in" element={<StaffCheckIn />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Public pages
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";

// User
import MyBookings from "./pages/MyBookings";
import TicketQR from "./pages/TicketQR";

// Organizer
import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizerEvents from "./pages/OrganizerEvents";
import OrganizerEventBookings from "./pages/OrganizerEventBookings";
import OrganizerEventAnalytics from "./pages/OrganizerEventAnalytics";
import OrganizerTicketManager from "./pages/OrganizerTicketManager";
import CreateEvent from "./pages/CreateEvent";
import CreateTickets from "./pages/CreateTickets";

// Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminEventApproval from "./pages/AdminEventApproval";
import AdminRefunds from "./pages/AdminRefunds";
import Organizations from "./pages/admin/Organizations";

// Staff
import StaffCheckIn from "./pages/StaffCheckIn";

function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Navbar role={role} />

      <Routes>
        {/* ================= BASE REDIRECTS ================= */}
        <Route
          path="/organizer"
          element={<Navigate to="/organizer/dashboard" replace />}
        />
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route
          path="/staff"
          element={<Navigate to="/staff/checkin" replace />}
        />

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetails />} />

        {/* ================= USER ================= */}
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/ticket/:bookingId" element={<TicketQR />} />

        {/* ================= ORGANIZER ================= */}
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/create-event" element={<CreateEvent />} />
        <Route path="/organizer/events" element={<OrganizerEvents />} />
        <Route
          path="/organizer/events/:eventId/bookings"
          element={<OrganizerEventBookings />}
        />
        <Route
          path="/organizer/events/:eventId/analytics"
          element={<OrganizerEventAnalytics />}
        />
        <Route
          path="/organizer/events/:eventId/tickets"
          element={<OrganizerTicketManager />}
        />
        <Route
          path="/organizer/events/:eventId/tickets/create"
          element={<CreateTickets />}
        />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events/pending" element={<AdminEventApproval />} />
        <Route path="/admin/refunds" element={<AdminRefunds />} />
        <Route path="/admin/organizations" element={<Organizations />} />

        {/* ================= STAFF ================= */}
        <Route path="/staff/checkin" element={<StaffCheckIn />} />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
