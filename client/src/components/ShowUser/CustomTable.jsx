import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBody from "./TableBody";
const CustomTable = () => {
  const [searchData, setSearchData] = useState("");

  const [userData, setUserData] = useState([]);
  const [msg, setMsg] = useState(" data ");
  const [msgStyle, setMsgStyle] = useState({
    visibility: `hidden`,
    color: "red",
    fontSize: "2rem",
  });
  const [loading, setLoading] = useState(true);
  const [up, setUp] = useState(0);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const getData =  () => {
      axios
        .get(`http://127.0.0.1:4000/allusers`)
        .then((res) => {
          // console.log(res.data);
          setUserData(res.data);
          // console.log(userData);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getData();
    return () => {
      source.cancel();
    };
  }, [up]);
  const deleteData = (id) => {
    // console.log(id);
    // console.log('dlet');
    // console.log(`http://127.0.0.1:4000/delete/${id}`);
    axios
      .delete(`http://127.0.0.1:4000/delete/${id}`)
      .then((res) => {
        // console.log(`deleted`);
        setMsg("Data Deleted!");
        setMsgStyle({
          visibility: `visible`,
          color: "red",
          fontSize: "2rem",
        });
        setTimeout(() => {
          setMsg("data");
          setMsgStyle({
            visibility: `hidden`,
            color: "red",
            fontSize: "2rem",
          });
        }, 5000);
        // console.log(res);
        setUp(up + 1);
      })
      .catch((err) => {
        setMsg("Data cant be Deleted!");
        setTimeout(() => {
          setMsg("data");
          setMsgStyle({
            visibility: `hidden`,
            color: "red",
            fontSize: "2rem",
          });
        }, 5000);
        console.log(err);
      });
  };
  const inputHandler = (e) => {
    const { value } = e.target;
    setSearchData(value);
  };
  const searchResult = async (e) => {
    e.preventDefault();
    // console.log(searchData);
    if (searchData !== "" && searchData !== null) {
      axios
        .get(`http://127.0.0.1:4000/allusers/${searchData}`)
        .then((res) => {
          // setUserData(res.data);
          // console.log(res.data);
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUp(up + 1);
    }
  };
  return (
    <>
      <form onSubmit={searchResult} id="search">
        <div className="container">
          <input
            type="text"
            name="firstname"
            placeholder="Search by firstname"
            onChange={inputHandler}
            value={searchData}
            autoComplete="off"
          />
          <button type="submit">Search</button>
          <button
            type="reset"
            onClick={() => {
              setSearchData("");
              setUp(up + 1);
            }}
          >
            Clear
          </button>
        </div>
      </form>
      <p style={msgStyle}>{msg}</p>

      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>DOB</th>
            <th>About</th>
            <th>Options</th>
          </tr>
        </thead>
        {/* from below,use map method */}
        {/* for delete, use router Link on button and in path provide its id */}
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : userData.length > 0 ? (
            userData.map((cvalue, i) => {
              const dob = new Date(cvalue.DateOfBirth);
              return (
                <TableBody
                  key={cvalue._id}
                  fname={cvalue.firstname}
                  lname={cvalue.lastname}
                  email={cvalue.email}
                  dob={dob.toLocaleDateString()}
                  bio={cvalue.bio}
                  fp={cvalue._id}
                  deleteFun={deleteData}
                  link={`/edit/${cvalue._id}`}
                />
                // <>
                //   <tr key={cvalue._id}>
                //     <td>{cvalue.firstname}</td>
                //     <td>{cvalue.lastname}</td>
                //     <td>{cvalue.email}</td>
                //     <td>{dob.toLocaleDateString()}</td>
                //     <td>{cvalue.bio}</td>
                //     <td>
                //       <button
                //         onClick={() => {
                //           deleteData(cvalue._id);
                //         }}
                //       >
                //         Delete
                //       </button>
                //       <Link to={`/edit/${cvalue._id}`}>
                //         <button>Edit</button>
                //       </Link>
                //     </td>
                //   </tr>
                // </>
              );
            })
          ) : (
            <tr>
              <td>No user found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CustomTable;
