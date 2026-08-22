import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAs9R785IE_kBsduUdEng3Vfqz1Ljl11f4",
  authDomain: "flareu-tw-translation.firebaseapp.com",
  databaseURL: "https://flareu-tw-translation-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flareu-tw-translation",
  storageBucket: "flareu-tw-translation.firebasestorage.app",
  messagingSenderId: "753531558153",
  appId: "1:753531558153:web:7106f9c2d253cae62fdbd8",
  measurementId: "G-SLWB8QJJ3J"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// 提供給全站使用
window.db = getDatabase(app);
window.fb_ref = ref;
window.fb_onValue = onValue;
window.fb_runTransaction = runTransaction;

// Anonymous Auth
const auth = getAuth(app);
window.fb_auth = auth;

// 避免重複登入
if (!auth.currentUser) {
  signInAnonymously(auth).catch(console.error);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.userUID = user.uid;
    console.log("匿名登入成功：", user.uid);
  }
});
