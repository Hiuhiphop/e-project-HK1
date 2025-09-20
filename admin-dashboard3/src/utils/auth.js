export const login = (username, password) => {
  if (username === 'admin' && password === 'MatKhauMoi2025!') {
    localStorage.setItem('role', 'admin');
    localStorage.setItem('username', 'admin');
    return true;
  }
  
  if (username === 'John Doe' && password === 'MatKhauMoi2025!') {
    localStorage.setItem('role', 'lawyer');
    localStorage.setItem('username', 'John Doe'); 
    return true;
  }
  return false;
};

export const isAdmin = () => {
  return localStorage.getItem('role') === 'admin';
};

export const isLawyer = () => {
  return localStorage.getItem('role') === 'lawyer';
};

export const getLoggedInUser = () => {
    return {
        username: localStorage.getItem('username'),
        role: localStorage.getItem('role'),
    };
};

export const logout = () => {
  localStorage.removeItem('role');
  localStorage.removeItem('username');
};