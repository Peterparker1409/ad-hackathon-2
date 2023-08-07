import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  desc: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, desc } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !desc) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            name,
            desc,
          })
          .then(() => {
            setState({ name: "", desc: "", });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Added Successfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            name,
            desc,
          })
          .then(() => {
            setState({ name: "", desc: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Updated Successfully");
      }

      setTimeout(() => history.push("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Desc</label>
        <input
          type="email"
          id="desc"
          name="desc"
          placeholder="Your desc ..."
          value={desc || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
