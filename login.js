document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    const loginName = document.getElementById('userName').value;
    const loginPw = document.getElementById('userPw').value;

    // Check if users exist in localStorage
    let users = localStorage.getItem('users');
    if (users) {
        users = JSON.parse(users);
    } else { 
        users = [];
    }

    let loginError = document.getElementById('loginError');

    for (let i = 0; i < users.length; i++)
    {
        if (users[i].name == loginName && users[i].password != loginPw){ loginError.innerHTML = "wrong password"; return;}
        else if (users[i].name == loginName && users[i].password == loginPw){ loginError.innerHTML = ""; votingSite(loginName); return;}
    }

    const newUser = {
        name: loginName,
        password: loginPw
    }

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = "index.html";
});


function votingSite(name) {
    if (name == "admin") {
        console.log("Hello Admin!");
        document.querySelector('.loginArea').style.display = 'none';
        document.querySelector('header').style.display = "flex";
        document.querySelector('header span').innerHTML = name;
        document.querySelector('.container').style.display = "block";
        document.querySelector('footer').style.display = "flex";
        return;
    }

    else {
        console.log("Hello", name);
        document.querySelector('.loginArea').style.display = 'none';
        document.querySelector('header').style.display = "flex";
        document.querySelector('header span').innerHTML = name;
        document.querySelector('.container').style.display = "block";
        return;
        }
}

document.querySelector('header button').addEventListener('click', () => location.reload());