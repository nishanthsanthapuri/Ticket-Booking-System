const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "#111",
        color: "#fff",
        padding: "10px 16px",
        borderRadius: 6,
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
