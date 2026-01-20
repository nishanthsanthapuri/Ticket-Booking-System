export default function ErrorBanner({ message }) {
  if (!message) return null;

  return <div style={{ color: "red", marginTop: 10 }}>{message}</div>;
}
