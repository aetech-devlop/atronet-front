import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/shared/hooks/use-toast';
import { usersService } from '@/entities/users/service';
import { useCreateUser } from '@/entities/users/queries';

export interface User {
  serialnumber: number;
  email: string;
  name: string;
  phone: string;
  level: 'admin' | 'user';
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, phone: string) => Promise<boolean>;
  logout: () => void;
  deleteAccount: () => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const createUserMutation = useCreateUser();

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      fetchCurrentUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchCurrentUser = async (authToken: string) => {
    try {
      // Extract user ID from token and fetch user data
      const userId = authToken.replace('token-', '');
      const user = await usersService.getUserById(userId);
      
      if (user) {
        setUser({
          serialnumber: parseInt(user.id),
          email: user.email,
          name: user.name,
          phone: '', // phone field doesn't exist in User type
          level: user.role === 'admin' ? 'admin' : 'user',
          is_active: user.is_active
        });
      } else {
        localStorage.removeItem('auth_token');
        setToken(null);
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      localStorage.removeItem('auth_token');
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('AuthContext: Starting login for:', email);
      
      // Use real login API
      const user = await usersService.login(email, password);
      
      if (user) {
        console.log('AuthContext: Login successful, user:', user);
        
        const userState = {
          serialnumber: parseInt(user.id),
          email: user.email,
          name: user.name,
          phone: '', // phone field doesn't exist in User type
          level: user.role === 'admin' ? 'admin' : 'user',
          is_active: user.is_active
        };
        
        // Create token based on user ID
        const token = `token-${user.id}`;
        
        setUser(userState);
        setToken(token);
        localStorage.setItem('auth_token', token);
        
        toast({
          title: "로그인 성공",
          description: user.role === 'admin' ? "관리자로 로그인되었습니다." : "로그인되었습니다.",
          duration: 3000,
        });
        
        return true;
      } else {
        toast({
          title: "로그인 실패",
          description: "이메일 또는 비밀번호가 잘못되었습니다.",
          variant: "destructive",
          duration: 3000,
        });
        return false;
      }
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      toast({
        title: "로그인 오류",
        description: error instanceof Error ? error.message : "네트워크 오류가 발생했습니다.",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };

  const register = async (email: string, password: string, name: string, phone: string): Promise<boolean> => {
    try {
      console.log('AuthContext: Starting register for:', email);
      const userData = {
        email,
        password,
        name,
        role: 'user' as const,
        affiliation: 'User'
      };
      console.log('AuthContext: User data:', userData);

      const newUser = await createUserMutation.mutateAsync(userData);
      console.log('AuthContext: Register response:', newUser);

      if (newUser) {
        console.log('AuthContext: Register successful');
        toast({
          title: "회원가입 완료",
          description: "성공적으로 가입되었습니다.",
          duration: 3000,
        });
        return true;
      } else {
        console.log('AuthContext: Register failed - newUser is null');
        toast({
          title: "회원가입 실패",
          description: "회원가입에 실패했습니다.",
          variant: "destructive",
          duration: 3000,
        });
        return false;
      }
    } catch (error) {
      console.error('AuthContext: Register error:', error);
      toast({
        title: "회원가입 오류",
        description: error instanceof Error ? error.message : "네트워크 오류가 발생했습니다.",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    toast({
      title: "로그아웃",
      description: "성공적으로 로그아웃되었습니다.",
    });
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!token || !user) return false;

    try {
      const success = await usersService.deleteUser(user.serialnumber.toString());
      
      if (success) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');
        toast({
          title: "계정 삭제",
          description: "계정이 성공적으로 삭제되었습니다.",
        });
        return true;
      } else {
        toast({
          title: "계정 삭제 실패",
          description: "계정 삭제에 실패했습니다.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "계정 삭제 오류",
        description: error instanceof Error ? error.message : "네트워크 오류가 발생했습니다.",
        variant: "destructive",
      });
      return false;
    }
  };

  const contextValue: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    deleteAccount,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};