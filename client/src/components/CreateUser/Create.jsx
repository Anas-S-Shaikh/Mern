import React, { useState } from "react";
import axios from "axios";
import "./style.css";
const Create = () => {
  const [postData, setPostData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    DateOfBirth: "",
    bio: "",
  });
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
      .post("http://127.0.0.1:4000/newuser", postData)
      .then((res) => {
        // console.log(res);
        setMsg("Data Added!");
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
        setMsg(`Error inserting data!`);
        setMsg("Data Cant be Added!");
        setTimeout(() => {
          setMsg("");
        }, 5000);
      });
  };

  return (
    <div className="create">
      <h1>Create New User Data</h1>
      <form onSubmit={submit}>
        <input
          autoComplete="off"
          type="text"
          placeholder="Enter firstname"
          required
          name="firstname"
          value={postData.firstname}
          onChange={inputHandler}
        />
        <input
          autoComplete="off"
          type="text"
          placeholder="Enter lastname"
          required
          name="lastname"
          value={postData.lastname}
          onChange={inputHandler}
        />
        <input
          autoComplete="off"
          type="email"
          placeholder="Enter email"
          required
          name="email"
          value={postData.email}
          onChange={inputHandler}
        />
        <input
          autoComplete="off"
          type="date"
          placeholder="Enter DOB"
          required
          name="DateOfBirth"
          value={postData.DateOfBirth}
          onChange={inputHandler}
        />
        <input
          autoComplete="off"
          type="text"
          placeholder="Write short bio"
          required
          name="bio"
          value={postData.bio}
          onChange={inputHandler}
        />
        <button type="submit" id="btn-submit">
          Submit
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
      </form>
      <p className="msg"> {msg}</p>
    </div>
  );
};

export default Create;
