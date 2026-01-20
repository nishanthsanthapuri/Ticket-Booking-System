import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const EventAnalytics = () => {
  const { eventId } = useParams();
  const [funnel, setFunnel] = useState(null);
  const [insights, setInsights] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // 1️⃣ Funnel analytics
        const funnelRes = await api.get(`/analytics/events/${eventId}/funnel`);

        setFunnel(funnelRes.data);

        // 2️⃣ AI insights (safe)
        const insightsRes = await api.get(
          `/analytics/events/${eventId}/insights`
        );

        setInsights(insightsRes.data.insights);
      } catch {
        setError("Failed to load analytics");
      }
    };

    fetchAnalytics();
  }, [eventId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Event Analytics</h2>

      {error && <p>{error}</p>}

      {!funnel && <p>Loading analytics...</p>}

      {funnel && (
        <>
          <h3>Conversion Funnel</h3>
          <p>Views: {funnel.funnel.views}</p>
          <p>Bookings: {funnel.funnel.bookings}</p>
          <p>Paid Bookings: {funnel.funnel.paidBookings}</p>
          <p>Check-ins: {funnel.funnel.checkIns}</p>

          <h4>Conversion Rates</h4>
          <p>View → Booking: {funnel.conversionRates.viewToBooking}</p>
          <p>Booking → Payment: {funnel.conversionRates.bookingToPayment}</p>
          <p>
            Payment → Attendance: {funnel.conversionRates.paymentToAttendance}
          </p>
        </>
      )}

      <hr />

      <h3>AI Insights</h3>
      <p>{insights || "No AI insights available yet."}</p>
    </div>
  );
};

export default EventAnalytics;
