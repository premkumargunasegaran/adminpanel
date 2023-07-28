import React, { useState } from "react";

const CrudComponentWithMultipleInputs = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", age: "", email: "" });
  const [editedItem, setEditedItem] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleAddItem = () => {
    if (
      newItem.name.trim() === "" ||
      newItem.age.trim() === "" ||
      newItem.email.trim() === ""
    ) {
      return;
    }
    setData((prevData) => [...prevData, newItem]);
    setNewItem({ name: "", age: "", email: "" });
  };

  const handleEditItem = (index) => {
    setEditedItem(index);
    setNewItem(data[index]);
  };

  const handleUpdateItem = () => {
    if (
      newItem.name.trim() === "" ||
      newItem.age.trim() === "" ||
      newItem.email.trim() === ""
    ) {
      return;
    }
    const updatedData = [...data];
    updatedData[editedItem] = newItem;
    setData(updatedData);
    setEditedItem(null);
    setNewItem({ name: "", age: "", email: "" });
  };

  const handleDeleteItem = (index) => {
    const updatedData = data.filter((item, i) => i !== index);
    setData(updatedData);
  };

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name} - {item.age} - {item.email}{" "}
            <button onClick={() => handleEditItem(index)}>Edit</button>{" "}
            <button onClick={() => handleDeleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="age"
          value={newItem.age}
          onChange={handleInputChange}
          placeholder="Age"
        />
        <input
          type="text"
          name="email"
          value={newItem.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        {editedItem !== null ? (
          <button onClick={handleUpdateItem}>Update</button>
        ) : (
          <button onClick={handleAddItem}>Add</button>
        )}
      </div>
    </div>
  );
};

export default CrudComponentWithMultipleInputs;
