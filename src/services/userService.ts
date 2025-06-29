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
    createdAt?: string;
  }
  
  export const saveUser = async (userData: User): Promise<ApiUser> => {
    try {
      const response = await api.post('/Users', {
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
      const response = await api.get(`/Users`, {
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
      const response = await api.get(`/Users/${id}`);
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
      const response = await api.get(`/Users/role/${roleName}`);
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
      const response = await api.get('/Users/me');
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
      const response = await api.put(`/Users/profile`, {
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
      await api.post(`/Users/${userId}/roles`, { roleName });
    } catch (error) {
      console.error(`Error adding role ${roleName} to user ${userId}:`, error);
      throw error;
    }
  };
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
    } catch (error) {
      console.error(`Error deleting role ${roleName} from user ${userId}:`, error);
      throw error;
    }
  };

  export const getAllUsers = async (): Promise<ApiUser[]> => {
    try {
      const response = await api.get('/Users');
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  };