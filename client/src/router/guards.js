export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const requireAuth = (to, from, next) => {
  if (isAuthenticated()) {
    next();
  } else {
    next('/login');
  }
};

export const requireGuest = (to, from, next) => {
  if (!isAuthenticated()) {
    next();
  } else {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role === 'admin') {
      next('/admin');
    } else if (user?.role === 'hrd') {
      next('/hrd');
    } else {
      next('/user');
    }
  }
};