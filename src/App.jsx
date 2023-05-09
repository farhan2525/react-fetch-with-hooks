import React, { useEffect, useState } from "react";

const cachedData = {};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(1);

  const max = 10;
  useEffect(() => {
    if (cachedData[`user-${id}`]) {
      setUser(cachedData[`user-${id}`]);
      return;
    }
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data), (cachedData[`user-${id}`] = data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const nextHandler = () => {
    if (id < max) {
      setId(id + 1);
    }
  };
  const prevHandler = () => {
    if (id > 1) {
      setId(id - 1);
    }
  };
  return (
    <div>
      <h1>Users Detail - {id}</h1>
      {loading && <p>loading...</p>}
      {!loading && user && (
        <div>
          name: {user.name}
          <br />
          email: {user.email}
          <br />
          phone: {user.phone}
        </div>
      )}
      <button disabled={id == 1} onClick={prevHandler}>
        Previous
      </button>
      <button disabled={id == max} onClick={nextHandler}>
        Next
      </button>
    </div>
  );
};

export default App;
