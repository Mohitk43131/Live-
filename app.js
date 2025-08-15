// ===== IMPORT FIREBASE =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyA45woJ-QeDGpk7KkS_jkSaXuBTnqkzcQ8",
  authDomain: "next-streaming-645b2.firebaseapp.com",
  projectId: "next-streaming-645b2",
  storageBucket: "next-streaming-645b2.firebasestorage.app",
  messagingSenderId: "353530200083",
  appId: "1:353530200083:web:f82a1534b65ac4bbe5ffe6",
  measurementId: "G-CKWY5HNE8W"
};

// ===== INITIALIZE =====
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// ===== SIGN UP =====
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('msg');
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('loggedInUser', email);
      msg.style.color = "lightgreen";
      msg.textContent = "Account created successfully!";
      setTimeout(() => window.location.href = "index.html", 1000);
    } catch (error) {
      msg.style.color = "#ff8080";
      msg.textContent = "Email already registered";
    }
  });
}

// ===== LOGIN =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('msg');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('loggedInUser', email);
      msg.style.color = "lightgreen";
      msg.textContent = "Login successful!";
      setTimeout(() => window.location.href = "index.html", 1000);
    } catch (error) {
      msg.style.color = "#ff8080";
      msg.textContent = "Invalid email or password";
    }
  });
}

// ===== LOGOUT =====
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    localStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
  });
}

// ===== CHECK USER ON ANY PAGE =====
window.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const userDisplay = document.getElementById('userDisplay');
  
  if (userDisplay) {
    if (loggedInUser) {
      userDisplay.textContent = `Welcome, ${loggedInUser}`;
    } else {
      userDisplay.textContent = "Not logged in";
    }
  }
  
  // ===== CREATOR PAGE LOGIC =====
  const creatorSection = document.getElementById('creatorSection');
  if (creatorSection) {
    if (!loggedInUser) {
      window.location.href = "login.html";
      return;
    }
    
    const creatorAccounts = JSON.parse(localStorage.getItem("creatorAccounts") || "{}");
    
    if (creatorAccounts[loggedInUser]) {
      // Creator exists
      creatorSection.innerHTML = `
        <h2>Welcome, ${creatorAccounts[loggedInUser].name}</h2>
        <div class="creator-options">
          <button onclick="alert('Upload video feature coming soon!')">Upload Video</button>
          <button onclick="alert('Live stream feature coming soon!')">Start Live Stream</button>
        </div>
      `;
    } else {
      // Show form to create creator account
      creatorSection.innerHTML = `
        <h2>Create Creator Account</h2>
        <form id="creatorForm">
          <label>Email</label>
          <input type="email" value="${loggedInUser}" readonly />
          <label>Name</label>
          <input type="text" id="creatorName" required />
          <label>Username</label>
          <input type="text" id="creatorUsername" required />
          <button type="submit">Create Account</button>
        </form>
      `;
      
      document.getElementById('creatorForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('creatorName').value.trim();
        const username = document.getElementById('creatorUsername').value.trim();
        
        if (!name || !username) {
          alert("Please fill all fields");
          return;
        }
        
        creatorAccounts[loggedInUser] = { name, username };
        localStorage.setItem("creatorAccounts", JSON.stringify(creatorAccounts));
        alert("Creator account created successfully!");
        location.reload();
      });
    }
  }
});