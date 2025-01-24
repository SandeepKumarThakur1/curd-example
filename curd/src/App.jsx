import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    file: "",
    details: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // Update existing user
      const updatedUsers = users.map((user, index) =>
        index === editingIndex ? formData : user
      );
      setUsers(updatedUsers);
      toast.success("User updated successfully!"); // Toast for update
      setEditingIndex(null);
    } else {
      // Add new user
      setUsers([...users, formData]);
      toast.success("New user added successfully!"); // Toast for create
    }

    // Reset form
    setFormData({
      name: "",
      password: "",
      file: "",
      details: "",
    });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(users[index]);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    toast.danger("User deleted successfully!"); // Toast for delete
  };

  return (
    <>
      <div className="container">
        <h1 className="pt-3 pb-2">React CRUD App</h1>
        <hr />
        <div className="row">
          {/* Form Section */}
          <div className="col-lg-4 p-3">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="bg-transparent rounded p-2 text-white w-100"
                  style={{ border: "1px solid #fff" }}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="bg-transparent rounded p-2 text-white w-100"
                  style={{ border: "1px solid #fff" }}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  className="bg-transparent rounded p-2 text-white w-100"
                  style={{ border: "1px solid #fff" }}
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Enter details"
                  className="bg-transparent rounded p-2 text-white w-100"
                  style={{ border: "1px solid #fff" }}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="submit bg-success p-2 px-4 border-0 rounded text-white"
              >
                {editingIndex !== null ? "Update User" : "Add New User"}
              </button>
            </form>
          </div>

          {/* Users List Section */}
          <div className="col-lg-8 p-3">
            <h4>User List</h4>
            <ul className="p-0">
              {users.map((user, index) => (
                <li
                  key={index}
                  className="p-0 m-0 d-flex justify-content-between align-items-center mb-3"
                >
                  <div
                    className="d-flex gap-2 align-items-center"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <p className="mb-0 pb-1">{index + 1}.</p>
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center w-75"
                    >
                      <p className="mb-0 pb-1">{user.name}</p>
                      <p className="mb-0 pb-1">{user.details}</p>
                      <div>
                        <div
                          className="bg-white"
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                            overflow: "hidden",
                          }}
                        >
                          {user.file && (
                            <img
                              src={URL.createObjectURL(user.file)}
                              alt="User"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-flex gap-2 justify-content-end"
                    style={{ width: "25%" }}
                  >
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-info p-2 px-4 border-0 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-danger p-2 px-4 border-0 rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Toast Notifications Container */}
      <ToastContainer />
    </>
  );
};

export default App;
