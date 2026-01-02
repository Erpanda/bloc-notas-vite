const user = localStorage.getItem('user');

if (user) {
    window.location.href = '../views/dashboard';
} else {
    window.location.href = '../views/home';
}