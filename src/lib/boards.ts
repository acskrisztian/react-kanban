const API_URL = "http://localhost:3001/boards";

export const createBoard = async ({
  title,
  admin,
}: {
  title: string;
  admin: string;
}) => {
  try {
    const members = [admin];
    const columns = [
      { id: 1, title: "To Do" },
      { id: 2, title: "In Progress" },
      { id: 3, title: "Done" },
    ];
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, admin, members, columns }),
    });
    const data = await response.json();
    return { id: data.id, title: data.title };
  } catch (error) {
    throw new Error("Failed to create board");
  }
};

export const getBoards = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}?members_like=${userId}`);
    const data = await response.json();
    return data.map((board: any) => ({
      id: board.id,
      title: board.title,
    }));
  } catch (error) {
    throw new Error("Failed to fetch boards");
  }
};

export const getBoard = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch board");
  }
};
