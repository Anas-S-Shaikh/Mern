import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useParams } from "react-router";
const Edit = () => {
  const { id } = useParams();

  const [postData, setPostData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    DateOfBirth: "",
    bio: "",
  });
  useEffect(() => {
    axios(`http://127.0.0.1:4000/allusers/edit/${id}`)
      .then((res) => {
        // console.log(res.data);
        setPostData({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          DateOfBirth: res.data.DateOfBirth,
          bio: res.data.bio,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);
  const [msg, setMsg] = useState("");
  const inputHandler = (e) => {
    const { value, name } = e.target;
    setPostData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const submit = (e) => {
    e.preventDefault();
    // console.log("inside submit");
    // console.log(postData);

    axios
      .patch(`http://127.0.0.1:4000/allusers/edit/${id}`, postData)
      .then((res) => {
        // console.log(res);
        setMsg("Data Updated!");
        setTimeout(() => {
          setMsg("");
        }, 5000);
        setPostData({
          firstname: "",
          lastname: "",
          email: "",
          DateOfBirth: "",
          bio: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setMsg(`Error updating data!`);
        setMsg("Data Cant be Added!");
        setTimeout(() => {
          setMsg("");
        }, 5000);
      });
  };

  return (
    <div className="edit">
      <h1>Edit User Data</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Enter firstname"
          required
          name="firstname"
          value={postData.firstname}
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter lastname"
          required
          name="lastname"
          value={postData.lastname}
          onChange={inputHandler}
        />
        <input
          type="email"
          placeholder="Enter email"
          required
          name="email"
          value={postData.email}
          onChange={inputHandler}
        />
        <input
          type="date"
          placeholder="Enter DOB"
          required
          name="DateOfBirth"
          value={postData.DateOfBirth}
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Write short bio"
          required
          name="bio"
          value={postData.bio}
          onChange={inputHandler}
        />
        <button type="submit" id="btn-submit">
          Save
        </button>
        <button
          type="reset"
          id="btn-clear"
          onClick={() => {
            setPostData({
              firstname: "",
              lastname: "",
              email: "",
              DateOfBirth: "",
              bio: "",
            });
            setMsg("");
          }}
        >
          Clear
        </button>
        <Link to="/view" style={{textDecoration:'none'}} >
          <div id="btn-cancel">Cancel</div>
        </Link>
      </form>
      <p className="msg"> {msg}</p>
    </div>
  );
};

export default Edit;
