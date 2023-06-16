import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserRowAdmin({ user, index }: any) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user.lukqhdsngvkfq);

  const handleAdminToggle = async (userId: any, isAdmin: any) => {
    let admin;
    console.log(isAdmin);
    // return;
    isAdmin == false || isAdmin == undefined ? (admin = true) : (admin = false);
    console.log(admin);
    setIsAdmin(admin);

    if (admin) {
      toast.success(
        user.name ? user.name + " is now admin!" : "This user is now admin!"
      );
    } else {
      toast.info(
        user.name
          ? user.name + " is no longer admin"
          : "This user is no longer admin"
      );
    }

    // isAdmin == true || isAdmin != undefined
    //   ? (admin = "false")
    //   : (admin = "false");
    // console.log({ admin });

    // return;
    // console.log(userId);
    try {
      const res = await fetch("/api/users/" + userId + "?mod=" + admin, {
        method: "PUT",
      });
      // console.log(res);
      // IF RES - GOOD TOASTER
    } catch (err) {
      // console.log(err);
    }
  };

  const handleDelete = async (userId: string) => {
    // Code pour effectuer l'action de suppression

    // DELETE request using fetch with async/await
    await fetch("/api/users/" + userId, { method: "DELETE" });
    alert("Delete successful");
    setIsDeleted(true);
  };

  if (isDeleted) {
    return <></>;
  }
  return (
    <>
      <ToastContainer />
      <tr>
        <th>{index}</th>
        <td>{user.profileStatus ? user.profileStatus : "no data"}</td>
        <td>{user.username ? user.username : "no data"}</td>
        <td>{user.firstName ? user.firstName : "no data"}</td>
        <td>{user.lastName ? user.lastName : "no data"}</td>
        <td>{user.age ? user.age : "no data"}</td>
        <td>{user.email ? user.email : "no data"}</td>

        <td>{user.city ? user.city : "no data"} </td>
        <td>
          {user.premium ? "Yes" : user.premium === false ? "No" : "no data"}
        </td>
        <td>
          {user.languages.length !== 0
            ? user.languages.map((language: any, index: any) => (
                <div key={index}>{language}</div>
              ))
            : "no data"}
        </td>

        <td>{user.sex ? user.sex : "no data"}</td>
        <td>
          {user.attraction.length > 0
            ? user.attraction.map((attraction: string, index: any) => (
                <div key={index}>{attraction}</div>
              ))
            : "no data"}
        </td>

        <td>{isAdmin === true ? "Yes" : "No"}</td>
        <div className="form-control m-3">
          <label className="cursor-pointer label">
            <input
              onClick={() => handleAdminToggle(user._id, isAdmin)}
              type="checkbox"
              checked={isAdmin}
              className="checkbox checkbox-success"
            />
          </label>
        </div>
        <td>
          <button
            className="btn btn-error"
            onClick={() => handleDelete(user._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
