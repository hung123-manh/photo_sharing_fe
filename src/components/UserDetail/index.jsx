import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/api/user/${userId}`)
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to load user details:", err));
  }, [userId]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <h2>{user.first_name} {user.last_name}</h2>
      <p>Location: {user.location}</p>
      <p>Occupation: {user.occupation}</p>
      <p>Description: {user.description}</p>
      {user._id && (
        <Link to={`/photos/${user._id}`}>View Photos</Link>
      )}
    </div>
  );
}

export default UserDetail;
