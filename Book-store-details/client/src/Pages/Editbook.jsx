import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Editbook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    ISBM: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/book/detail/${id}`).then((res) => {
      setForm(res.data.book);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/book/updatebook/${id}`, form);
    navigate("/");
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
      <h2 className="mb-4 text-white">✏️ Edit Book</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {["title", "author", "price", "description", "ISBM"].map((field) => (
          <div className="col-md-6" key={field}>
            <label className="form-label text-white">{field.toUpperCase()}</label>
            <input
              type={field === "price" || field === "ISBM" ? "number" : "text"}
              className="form-control bg-dark text-white border-secondary"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-primary rounded-pill px-4">Update Book</button>
        </div>
      </form>
    </div>
  );
};

export default Editbook;
