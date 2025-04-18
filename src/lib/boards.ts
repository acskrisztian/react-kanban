const API_URL = "http://localhost:3002/boards";

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
    const columnOrder = columns.map(col => col.id);
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, admin, members, columns, columnOrder }),
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
    throw new Error(error as string);
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

export const updateBoard = async (id: string, data: any) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Failed to update board');
  }
};
