# 📚 The Unread Shelf

An interactive web application designed to track your personal reading list, organize books by reading status, and help you randomly pick your next read with a fun "Spin the Shelf" feature.

---

## ✨ Features

- **Interactive Bookshelf:** Visual representation of your book collection with customized book spines.
- **Spin the Shelf:** Can't decide what to read next? Spin the shelf to pick a random book from your To-Be-Read (TBR) pile.
- **Filter by Status:** Categorize books by **TBR**, **Currently Reading**, and **Finished**.
- **Add New Books:** Modal form allowing users to dynamically add new books with custom colors and details.
- **Responsive & Minimalist Design:** Soft aesthetic designed with custom serif typography and custom modal popups.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6)
- **Backend:** Python (Flask)
- **WSGI Server:** Gunicorn
- **Deployment:** Render

---
## 🌐 Live Demo

Check out the live app here: https://the-unread-shelf.onrender.com/


## 📁 Project Structure

```text
The-Unread-Shelf/
│
├── app.py                 # Main Flask application file
├── requirements.txt       # Python dependencies
├── Procfile               # Web server command for deployment
├── README.md              # Project documentation
│
├── static/                # Static assets
│   ├── style.css          # App styling and animations
│   └── script.js         # Interactive DOM logic & event handlers
│
└── templates/             # HTML templates
    └── index.html         # Main dashboard interface

