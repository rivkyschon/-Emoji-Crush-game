const formContainer = document.querySelector('.form-container');
const loginForm = document.querySelector('#sign-in-form');
const registerFrom = document.querySelector('#sign-up-form');
let username, usermail, userpassword;
let checkmail = false, flag = false;

const switchForm = (form) => {
    if (form == 'register') {
        if (window.innerWidth > 800) {
            formContainer.style.left = `50%`;
        }
        loginForm.style.marginLeft = `-150%`;
        registerFrom.style.marginLeft = `-100%`;
    } else {
        if (window.innerWidth > 800) {
            formContainer.style.left = `0%`;
        }
        loginForm.style.marginLeft = `0%`;
        registerFrom.style.marginLeft = `50%`;
    }
}

function findUser(array1) {
    let usermail = document.getElementById("mailin").value;
    let userpassword = document.getElementById("passwordin").value;
    if(usermail==""||userpassword===""){
        alert("one or more of the inputs are missing");
        location.href="../html/login.html";
        return;
    }
    array1.find(user => {
        if (user.mail === document.getElementById("mailin").value && user.password === document.getElementById("passwordin").value) {
            usermail = user.mail;
            userpassword = user.password;
            username=user.name;
            flag = true;
        }
        else if (user.mail === document.getElementById("mailin").value) {
            checkmail = true;
        }
    })
    return flag;
}

function localsaved_in() {
    if (!localStorage.getItem("every_user")) {
        window.localStorage.setItem('every_user', JSON.stringify([]));
    }
    let every_user = JSON.parse(localStorage.getItem("every_user"));
    let find = findUser(every_user);
    if (find) {
        let person = {
            "name": username,
            "mail": usermail,
            "password": userpassword,
        }
        localStorage.setItem('person', JSON.stringify(person))
        window.location.href = '../html/instructions.html';
    }
    else if (checkmail) {
        alert("The password is incorrect. Try again");
    }
    else if (!(find && checkmail)) {
        alert("The user is not found. Try to sign up");
    }
}

function localsaved_up() {
    let username = document.getElementById("upname").value;
    let usermail = document.getElementById("upmail").value;
    let userpassword = document.getElementById("uppassword").value;
    if(username===""|| usermail===""|| userpassword===""){
        alert("one or more of the inputs are missing");
        location.href="../html/login.html";
        return;
    }
    if (!localStorage.getItem("every_user")) {
        localStorage.setItem('every_user', JSON.stringify([]));
    }
    let every_user = JSON.parse(localStorage.getItem("every_user"));
    let checkMailFound =every_user.find(item => {
        return (item.mail===usermail)
    })
        if (checkMailFound) {
            alert("The mail found Try to sign in");
            return;
        }
    let person = {
        "name": username,
        "mail": usermail,
        "password": userpassword,
    }
    every_user.push(person);
    localStorage.setItem('every_user', JSON.stringify(every_user));
    localStorage.setItem('person', JSON.stringify(person))
    window.location.href = '../html/instructions.html';
}

function main() {
    let buttonup = document.getElementById("signup");
    let buttonin = document.getElementById("signin");
    buttonup.addEventListener("click", localsaved_up);
    buttonin.addEventListener("click", localsaved_in);
}
main();





