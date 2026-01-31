// admin.js
import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DOM Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login");

const titleInput = document.getElementById("title");
const messageInput = document.getElementById("message");
const categorySelect = document.getElementById("category");
const addBtn = document.getElementById("add");

// Disable admin actions by default
addBtn.disabled = true;

// 🔐 Admin Login
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Logged in successfully");
  } catch (error) {
    alert("❌ Login failed: " + error.message);
  }
});

// 👀 Check Auth State
onAuthStateChanged(auth, user => {
  if (user) {
    addBtn.disabled = false;
    loginBtn.disabled = true;
  } else {
    addBtn.disabled = true;
  }
});

// ➕ Add Notice
addBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const message = messageInput.value.trim();
  const category = categorySelect.value;

  if (!title || !message) {
    alert("Please fill all fields");
    return;
  }

  try {
    await addDoc(collection(db, "notices"), {
      title: title,
      message: message,
      category: category,
      timestamp: serverTimestamp()
    });

    alert("📢 Notice added successfully!");

    // Clear form
    titleInput.value = "";
    messageInput.value = "";
    categorySelect.selectedIndex = 0;

  } catch (error) {
    alert("❌ Error adding notice: " + error.message);
  }
});
