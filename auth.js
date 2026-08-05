const auth = {
    currentUser: null
};

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const authMessage = document.getElementById("authMessage");

loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    authMessage.innerHTML = "";
});

registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    authMessage.innerHTML = "";
});

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = {
        action: "register",
        name: document.getElementById("registerName").value.trim(),
        email: document.getElementById("registerEmail").value.trim(),
        password: document.getElementById("registerPassword").value
    };
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(body)
        });
        const result = await response.json();
        console.log(result);
        if(result.success){
            localStorage.setItem("ccaf-user", JSON.stringify(result.user));
            console.log("Saved:", localStorage.getItem("ccaf-user"));
            authMessage.innerHTML = "<p style='color:#61e6b1'>Registration Successful. Please login.</p>";
            registerForm.reset();
            loginTab.click();
        }else{
            authMessage.innerHTML =
                "<p style='color:#ff6b6b'>" + result.message + "</p>";
        }
    }catch(err){
        authMessage.innerHTML = "<p style='color:#ff6b6b'>Server Error.</p>";
    }
});

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = {
        action: "login",
        email: document.getElementById("loginEmail").value.trim(),
        password: document.getElementById("loginPassword").value
    };
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(body)
        });
        const result = await response.json();
        console.log(result);
        if (result.success) {
            document.getElementById("loggedUserName").innerText = result.user.name;
            auth.currentUser = result.user;
            localStorage.setItem("ccaf-user", JSON.stringify(result.user));
            console.log("Saved:", localStorage.getItem("ccaf-user"));
            document.getElementById("auth").classList.add("hidden");
            document.getElementById("welcome").classList.remove("hidden");
        } else {
            authMessage.innerHTML = "<p style='color:#ff6b6b'>" + result.message + "</p>";
        }
    } catch {
        authMessage.innerHTML = "<p style='color:#ff6b6b'>Server Error.</p>";
    }
});

function checkLogin() {
    console.log("checkLogin called");
    const storedUser = localStorage.getItem("ccaf-user");
    console.log("storedUser =", storedUser);
    if (!storedUser) {        
        document.getElementById("auth").classList.remove("hidden");
        document.getElementById("welcome").classList.add("hidden");
        return false;
    }
    try {
        const user = JSON.parse(storedUser);
        console.log("Logged in user:", user);
        document.getElementById("loggedUserName").innerText = user.name;
        auth.currentUser = user;
        document.getElementById("auth").classList.add("hidden");
        document.getElementById("welcome").classList.remove("hidden");
        console.log("Welcome page shown");
        return true;
    } catch (e) {
        localStorage.removeItem("ccaf-user");
        return false;
    }
}
document.getElementById("logoutButton").addEventListener("click", logout);

function logout(){
    localStorage.removeItem("ccaf-user");
    auth.currentUser = null;
    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("auth").classList.remove("hidden");
    loginForm.reset();
    authMessage.innerHTML = "";
}

function isLoggedIn(){
    return localStorage.getItem("ccaf-user") != null;
}
const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");
if (profileButton && profileMenu) {
    profileButton.addEventListener("click", () => { profileMenu.classList.toggle("hidden"); });
}
document.addEventListener("click", (e) => {
    if(!profileButton.contains(e.target) &&
       !profileMenu.contains(e.target)){
        profileMenu.classList.add("hidden");
    }
});
document.querySelectorAll(".profile-item[data-portal]").forEach(button => {
    button.addEventListener("click", () => {
        showPortal(button.dataset.portal);
        profileMenu.classList.add("hidden");
    });
});

document.addEventListener("DOMContentLoaded", checkLogin);
