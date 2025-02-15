const API_URL = "http://localhost:3001/users";

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(
      `${API_URL}?username=${username}&password=${password}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const user = {
        id: data[0].id,
        username: data[0].username,
        email: data[0].email,
      };
      saveUserToLocalStorage(user);
      return user;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    } else {
      throw new Error("Login failed: Unknown error");
    }
  }
};

export const signup = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const id = new Date().getTime();
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, email, username, password }),
    });
    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const data = await response.json();
    const user = {
      id: data.id,
      username: data.username,
      email: data.email,
    };
    saveUserToLocalStorage(user);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Signup failed: ${error.message}`);
    } else {
      throw new Error("Signup failed: Unknown error");
    }
  }
};

export const saveUserToLocalStorage = (user: object) => {
  localStorage.setItem("user", JSON.stringify(user));
};
