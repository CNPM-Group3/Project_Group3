interface User {
    email: string;
    name: string;
    picture?: string;
    address?: string;
    password?: string;
  }
  
  export const saveUser = (userData: User) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };
  
  export const findUserByEmail = (email: string): User | undefined => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return users.find((user: User) => user.email === email);
    } catch (error) {
      console.error('Error finding user:', error);
      return undefined;
    }
  };
  
  export const setCurrentUser = (userData: User) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };
  
  export const getCurrentUser = (): User | null => {
    const userStr = sessionStorage.getItem('user_profile');
    return userStr ? JSON.parse(userStr) : null;
  };