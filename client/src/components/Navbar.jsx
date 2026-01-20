import { Link } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      style={{
        padding: "14px 18px",
        background: "rgba(15,23,42,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3 style={{ color: "#fff" }}>🎟 Ticket Platform</h3>

      <div style={{ display: "flex", gap: 16 }}>
        {/* Public */}
        <Link to="/">Home</Link>

        {/* Attendee */}
        {!role && <Link to="/my-bookings">My Bookings</Link>}

        {/* Organizer */}
        {role === "organizer" && (
          <>
            <Link to="/organizer">Dashboard</Link>
            <Link to="/organizer/events">My Events</Link>
            <Link to="/organizer/create-event">Create Event</Link>
          </>
        )}

        {/* Admin */}
        {role === "admin" && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/admin/events/pending">Approve Events</Link>
            <Link to="/admin/refunds">Refunds</Link>
          </>
        )}

        {/* Staff */}
        {role === "staff" && <Link to="/staff/check-in">Check-In</Link>}

        {/* Auth */}
        {role && (
          <button onClick={logout} style={{ cursor: "pointer" }}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
