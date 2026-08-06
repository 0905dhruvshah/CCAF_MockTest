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
        const registerBtn = registerForm.querySelector("button");
        registerBtn.disabled = true;
        registerBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Creating Account...';
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
            if (result.success) {
                registerForm.reset();
                document.getElementById("successModal").classList.remove("hidden");
            } else {
                authMessage.innerHTML = "<p style='color:#ff6b6b'>" + result.message + "</p>";
            }
        } catch (err) {
            console.error(err);
            authMessage.innerHTML = "<p style='color:#ff6b6b'>Server Error.</p>";
        } finally {
            registerBtn.disabled = false;
            registerBtn.innerHTML = "Create Account";
        }
    });

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const loginBtn = loginForm.querySelector("button");
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Signing In...';
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
            const text = await response.text();
            console.log(text);
            if (result.success) {
                auth.currentUser = result.user;
                localStorage.setItem("ccaf-user", JSON.stringify(result.user));
                document.getElementById("loggedUserName").innerText = result.user.name;
                document.getElementById("auth").classList.add("hidden");
                document.getElementById("welcome").classList.remove("hidden");
            } else {
                authMessage.innerHTML = "<p style='color:#ff6b6b'>" + result.message + "</p>";
            }
        } catch (err) {
            console.error(err);
            authMessage.innerHTML = "<p style='color:#ff6b6b'>Server Error.</p>";
        } finally {
            loginBtn.disabled = false;
            loginBtn.innerHTML = "Login";
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

    document.getElementById("continueLoginBtn").addEventListener("click", () => {        
        document.getElementById("successModal").classList.add("hidden");
        loginTab.click();
    });
