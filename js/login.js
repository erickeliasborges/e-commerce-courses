let loggedUser = false;
let btnLogin = document.getElementById('btn-login');
let btnLogout = document.getElementById('btn-logout');

loadEventListeners();
configBtnLoginLogout();

function loadEventListeners() {
};

function createUserLocalStorage() {

    users = getUsersLocalStorage();
    users.push(getUser());
    localStorage.setItem('users', JSON.stringify(users));
    console.log(localStorage);

}

function validPasswordCreateUser() {
    console.log(document.getElementById("registerPassword").value === document.getElementById("registerRepeatPassword").value);
    return (document.getElementById("registerPassword").value === document.getElementById("registerRepeatPassword").value);
}

function getUser() {
    return {
        name: document.getElementById("registerName").value,
        userName: document.getElementById("registerUsername").value,
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword").value
    };
}

function login() {
    loggedUser = (loginValido());
    saveLoggedUserLocalStorage(loggedUser);
    configBtnLoginLogout();
    $('#modal-login').modal('hide');
};

function logout() {
    saveLoggedUserLocalStorage(false);
    configBtnLoginLogout();
};

function isItLoggedUser() {
    return getLoggedUserLocalStorage();
};

function configBtnLoginLogout() {
    if (isItLoggedUser()) {
        $('#btn-login').addClass('display-none');
        $('#btn-logout').removeClass('display-none');
    }
    else {
        $('#btn-login').removeClass('display-none');
        $('#btn-logout').addClass('display-none');
    };
};

function loginValido() {
    users = getUsersLocalStorage();
    let user = (users.find(searchUser => searchUser.userName == document.getElementById("loginName").value));
    return ((user != undefined) && (user.password == document.getElementById("loginPassword").value));
};

function usernameExistsInLocalStorage(username) {
    return (getUsersLocalStorage().find(searchUser => searchUser.userName == username));
};

function emailExistsInLocalStorage(email) {
    return (getUsersLocalStorage().find(searchUser => searchUser.email == email));
};

function getUsersLocalStorage() {
    let users;

    if (localStorage.getItem('users') === null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem('users'));
    };

    return users;
};

function saveUserLocalStorage(user) {
    let users = getUsersLocalStorage();

    if (users.find(searchUser => searchUser.userName == user.userName) != undefined) {
        return false;
    } else {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    };
};

function saveLoggedUserLocalStorage(loggedUser) {
    localStorage.setItem('logged-user', loggedUser);
};

function getLoggedUserLocalStorage() {
    return (localStorage.getItem('logged-user') != null) && (localStorage.getItem('logged-user').toUpperCase() == 'TRUE');
};