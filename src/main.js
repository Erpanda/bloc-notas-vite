const user = localStorage.getItem('user');

if (user) {
    window.location.href = 'dashboard';
} else {
    window.location.href = 'home';
}