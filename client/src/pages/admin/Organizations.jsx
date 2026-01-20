import { useEffect, useState } from "react";
import api from "../../api/axios";

const Organizations = () => {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    api
      .get("/organizations")
      .then((res) => setOrgs(res.data.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2>Organizations</h2>

      {orgs.map((org) => (
        <div
          key={org._id}
          style={{ border: "1px solid #444", padding: 10, marginBottom: 10 }}
        >
          <p>
            <b>Name:</b> {org.name}
          </p>
          <p>
            <b>Status:</b> {org.status}
          </p>
          <p>
            <b>Owner:</b> {org.ownerId}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Organizations;
