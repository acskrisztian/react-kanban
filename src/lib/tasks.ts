const API_URL = "http://localhost:3002/tasks";

export interface Task {
  id: string;
  title: string;
  description?: string;
  boardId: string;
  columnId: string;
  assignedMembers: string[];
}

export const createTask = async ({
  title,
  description,
  boardId,
  columnId,
}: {
  title: string;
  description?: string;
  boardId: string;
  columnId: string;
}) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        boardId,
        columnId,
      }),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Failed to create task");
  }
};

export const getTasksByBoard = async (boardId: string) => {
  try {
    const response = await fetch(`${API_URL}?boardId=${boardId}`);
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        updatedAt: new Date().toISOString(),
      }),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Failed to update task");
  }
};

export const updateAssignedMembers = async (taskId: string, assignedMembers: []) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignedMembers: assignedMembers,
      }),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Failed to assign member to task");
  }
}

