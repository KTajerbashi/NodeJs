// import type { User } from "../models/user";

const USERS_KEY = "react_admin_users";
const SESSION_KEY = "react_admin_session";

class AuthService {
  signup(user: User): boolean {
    const users = this.getUsers();

    const exists = users.some((x) => x.email === user.email);

    if (exists) {
      return false;
    }

    users.push(user);

    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();

    const user = users.find(
      (x) => x.email === email && x.password === password,
    );

    if (!user) {
      return false;
    }

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));

    return true;
  }

  logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
  }

  getCurrentUser(): User | null {
    const user = sessionStorage.getItem(SESSION_KEY);

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(SESSION_KEY) !== null;
  }

  getAllUsers(): User[] {
    return this.getUsers();
  }
  
  private getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);

    if (!users) {
      return [];
    }

    return JSON.parse(users);
  }
}

export default new AuthService();
