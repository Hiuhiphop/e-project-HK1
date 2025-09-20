export const login = (username, password) => {
  if (username === 'admin' && password === 'password') {
    localStorage.setItem('role', 'admin');
    localStorage.setItem('username', 'admin');
    return true;
  }
  // Giả lập đăng nhập luật sư
  if (username === 'lawyer_a' && password === 'password') {
    localStorage.setItem('role', 'lawyer');
    localStorage.setItem('username', 'Nguyễn Văn A');
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