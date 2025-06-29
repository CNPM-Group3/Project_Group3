import api from './apiService';

export interface User {
    id?: number;
    email: string;
    name: string;
    picture?: string;
    address?: string;
    password?: string;
    role?: string;
    avatarUrl?: string;
  }
  
  export interface ApiUser {
    id: number;
    email: string;
    fullName: string;
    avatar?: string;
    address?: string;
    role: string;
    status: string;
<<<<<<< HEAD
=======
    createdAt?: string;
>>>>>>> Nhi
  }
  
  export const saveUser = async (userData: User): Promise<ApiUser> => {
    try {
<<<<<<< HEAD
      const response = await api.post('/api/Users', {
=======
      const response = await api.post('/Users', {
>>>>>>> Nhi
        email: userData.email,
        fullName: userData.name,
        password: userData.password,
        role: 'USER',
      });
      return response.data;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };
  
  export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    try {
<<<<<<< HEAD
      const response = await api.get(`/api/Users`, {
=======
      const response = await api.get(`/Users`, {
>>>>>>> Nhi
        params: { email }
      });
      
      const users = response.data;
      if (!users || users.length === 0) return undefined;

      const user = users[0];
      return {
        email: user.email,
        name: user.fullName,
        picture: user.avatar,
        address: user.address,
      };
    } catch (error) {
      console.error('Error finding user:', error);
      return undefined;
    }
  };
  
  export const getUserById = async (id: number): Promise<User> => {
    try {
<<<<<<< HEAD
      const response = await api.get(`/api/Users/${id}`);
=======
      const response = await api.get(`/Users/${id}`);
>>>>>>> Nhi
      const apiUser: ApiUser = response.data;
      return {
        id: apiUser.id,
        email: apiUser.email,
        name: apiUser.fullName,
        picture: apiUser.avatar,
        address: apiUser.address,
        role: apiUser.role,
        avatarUrl: apiUser.avatar,
      };
    } catch (error) {
      console.error(`Error getting user with ID ${id}:`, error);
      throw error;
    }
  };
  
  export const getUsersByRole = async (roleName: string): Promise<ApiUser[]> => {
    try {
<<<<<<< HEAD
      const response = await api.get(`/api/Users/role/${roleName}`);
=======
      const response = await api.get(`/Users/role/${roleName}`);
>>>>>>> Nhi
      return response.data;
    } catch (error) {
      console.error(`Error getting users with role ${roleName}:`, error);
      throw error;
    }
  };
  
  export const setCurrentUser = (userData: User): void => {
    sessionStorage.setItem('user_profile', JSON.stringify(userData));
  };
  
  export const getCurrentUser = async (): Promise<User | null> => {
    try {
<<<<<<< HEAD
      const response = await api.get('/api/Users/me');
=======
      const response = await api.get('/Users/me');
>>>>>>> Nhi
      const apiUser: ApiUser = response.data;
      return {
        id: apiUser.id,
        email: apiUser.email,
        name: apiUser.fullName,
        picture: apiUser.avatar,
        address: apiUser.address,
        role: apiUser.role,
        avatarUrl: apiUser.avatar,
      };
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  };

  export const updateUserProfile = async (userData: Partial<User>): Promise<ApiUser> => {
    try {
<<<<<<< HEAD
      const response = await api.put(`/api/Users/profile`, {
=======
      const response = await api.put(`/Users/profile`, {
>>>>>>> Nhi
        fullName: userData.name,
        email: userData.email,
        address: userData.address,
        // Add other profile fields as needed based on API spec
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  export const changePassword = async (
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    try {
      await api.post(`/users/${userId}/change-password`, {
        oldPassword,
        newPassword,
      });
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };

  export const addRoleToUser = async (userId: number, roleName: string): Promise<void> => {
    try {
<<<<<<< HEAD
      await api.post(`/api/Users/${userId}/roles`, { roleName });
=======
      await api.post(`/Users/${userId}/roles`, { roleName });
>>>>>>> Nhi
    } catch (error) {
      console.error(`Error adding role ${roleName} to user ${userId}:`, error);
      throw error;
    }
  };
<<<<<<< HEAD

  export const deleteRoleFromUser = async (userId: number, roleName: string): Promise<void> => {
    try {
      await api.delete(`/api/Users/${userId}/roles/${roleName}`);
=======
  export const updateUserRoles = async (userId: number, roleNames: string[]): Promise<void> => {
    try {
      await api.put(`/Users/${userId}/roles`, {
        roleNames,
      });
    } catch (error) {
      console.error(`Error updating roles for user ${userId}:`, error);
      throw error;
    }
  };
  export const deleteRoleFromUser = async (userId: number, roleName: string): Promise<void> => {
    try {
      await api.delete(`/Users/${userId}/roles/${roleName}`);
>>>>>>> Nhi
    } catch (error) {
      console.error(`Error deleting role ${roleName} from user ${userId}:`, error);
      throw error;
    }
  };

  export const getAllUsers = async (): Promise<ApiUser[]> => {
    try {
<<<<<<< HEAD
      const response = await api.get('/api/Users');
=======
      const response = await api.get('/Users');
>>>>>>> Nhi
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  };