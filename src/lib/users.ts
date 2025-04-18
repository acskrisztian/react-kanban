const API_URL = "http://localhost:3002/users";

export interface User {
  id: string;
  username: string;
}

export const getUsers = async (userIds: string[]) => {
  try {
    const response = await fetch(`${API_URL}?${userIds.map(id => `id=${id}`).join('&')}`);
    const users = await response.json();
    return users.map((user: any) => ({
      id: user.id,
      username: user.username
    }));
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}; 