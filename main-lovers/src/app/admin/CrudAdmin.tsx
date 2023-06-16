"use client";
import React from "react";
import { useEffect, useState } from "react";
import UserRowAdmin from "./userRowAdmin";

const CrudAdmin = () => {
  const [users, setUsers] = useState([]);
  const getData = async () => {
    const res = await fetch("/api/users/").then((r) => r.json());
    //console.log(res)
    setUsers(res.data);
  };
  useEffect(() => {
    getData();
    console.log(users);
  }, []); // si changement dans tableau users >> useffect on >>> rafraichissement page faisait une boucle array avec users []

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Status</th>
              <th>Username</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Age</th>
              <th>email</th>
              <th>City</th>
              <th>Premium</th>
              <th>Languages</th>
              <th>sex</th>
              <th>Attraction</th>
              <th>Admin</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <UserRowAdmin user={user} key={index} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CrudAdmin;
