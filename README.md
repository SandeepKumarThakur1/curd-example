# React CRUD App

This is a simple **React CRUD (Create, Read, Update, Delete)** application. It allows you to perform the basic CRUD operations to manage a list of users, including adding new users, viewing the list of users, updating user data, and deleting users. Notifications are shown using **React Toastify** when a user is added, updated, or deleted.

## Features

- **Create**: Add a new user by entering details in the form.
- **Read**: Display the list of users with their details.
- **Update**: Edit an existing user’s details and update them.
- **Delete**: Remove a user from the list.
- **Toasts**: Notifications are shown on Create, Update, and Delete actions.

---

## How It Works
1. Create
- You can add new users by filling out the form with a user's name, password, details, and an optional file. Clicking the "Add New User" button adds the user to the list.
```javascript
const handleFormSubmit = (e) => {
  e.preventDefault();
  setUsers([...users, formData]); // Adds new user
};
```

2. Read
- The users are displayed in a list format, showing each user's name and details. The list is automatically updated when new users are added.
```javascript
<ul>
  {users.map((user, index) => (
    <li key={index}>{user.name}</li>
  ))}
</ul>
```

3. Update
- You can edit a user's information by clicking the "Edit" button next to their name. The form will be pre-filled with their details, allowing you to modify and update them.
```javascript
const handleEdit = (index) => {
  setEditingIndex(index);
  setFormData(users[index]); // Pre-fills the form with user data
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const updatedUsers = users.map((user, index) =>
    index === editingIndex ? formData : user // Updates the user
  );
  setUsers(updatedUsers);
};
```

4. Delete
- The "Delete" button removes the user from the list.
```javascript
const handleDelete = (index) => {
  const updatedUsers = users.filter((_, i) => i !== index); // Removes user
  setUsers(updatedUsers);
};
```

5. Toast Notifications
- A toast message appears when a user is added, updated, or deleted. React Toastify is used to show these notifications in the top-right corner of the screen.
```javascript
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Show success message when a user is added or updated
toast.success("User added/updated successfully!");

// Show error message when a user is deleted
toast.error("User deleted successfully!");
```

### Libraries Used
- `React`: JavaScript library for building user interfaces.
- `React Toastify`: Library for showing toast notifications.
