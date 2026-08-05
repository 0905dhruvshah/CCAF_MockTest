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
        if(result.success){
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
        if (result.success) {
            auth.currentUser = result.user;
            localStorage.setItem("ccaf-user", JSON.stringify(result.user));
            document.getElementById("auth").classList.add("hidden");
            document.getElementById("welcome").classList.remove("hidden");
        } else {
            authMessage.innerHTML = "<p style='color:#ff6b6b'>" + result.message + "</p>";
        }
    } catch {
        authMessage.innerHTML = "<p style='color:#ff6b6b'>Server Error.</p>";
    }
});
