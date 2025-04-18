import useActiveBoard from "@/hooks/useActiveBoard";
import { createTask } from "@/lib/tasks";
import { addTask } from "@/store/activeBoardSlice";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import TaskCard from "../TaskCard";

interface BoardColumnProps {
  id: string;
  title: string;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}

const BoardColumn: React.FC<BoardColumnProps> = ({
  id,
  title,
  index,
  moveColumn,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);
  const dispatch = useDispatch();

  const board = useActiveBoard();
  const tasks = board.tasks.filter((task) => task.columnId === id);

  // Function to adjust textarea height
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const lineHeight = 20; // Height per line in pixels

      // Count the number of lines by counting newlines
      const lineCount = textarea.value.split("\n").length;

      // Set height based on line count (minimum 1 line)
      const newHeight = Math.max(1, lineCount) * lineHeight;
      textarea.style.height = `${newHeight}px`;
    }
  };

  // Effect to focus when the textarea appears
  useEffect(() => {
    if (isCreatingTask && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isCreatingTask]);

  const [{ isDragging }, drag] = useDrag({
    type: "COLUMN",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: (item: { id: string; index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the left
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      // Only perform the move if the mouse is over the middle half of the column
      if (
        hoverClientX > hoverBoundingRect.width * 0.25 &&
        hoverClientX < hoverBoundingRect.width * 0.75
      ) {
        moveColumn(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  drag(drop(ref));

  const handleCreateTask = async () => {
    if (textareaRef.current?.value) {
      try {
        const newTask = await createTask({
          title: textareaRef.current?.value,
          boardId: board.id,
          columnId: id,
        });
        dispatch(addTask(newTask));
        setIsCreatingTask(false);
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    } else {
      setIsCreatingTask(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`p-[8px] lg:w-[250px] flex flex-col ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between hover:bg-gray-600 px-[8px] py-[4px] rounded-sm group cursor-move">
        <h2 className="text-[14px] font-bold">{title}</h2>
        <span className="text-[14px] opacity-0 group-hover:opacity-100">
          0 tasks
        </span>
      </div>
      <div className="flex flex-col gap-[8px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {isCreatingTask ? (
          <div className="bg-white p-[8px] rounded-[4px] flex">
            <textarea
              ref={textareaRef}
              name="taskName"
              id="taskName"
              placeholder="Enter a title for this task..."
              className="w-full outline-none resize-none h-[20px] max-h-[80px] overflow-y-auto text-[14px] leading-[20px] p-0"
              onChange={adjustTextareaHeight}
              onBlur={handleCreateTask}
            />
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsCreatingTask(true)}
              className="text-[12px] font-bold cursor-pointer"
            >
              + Add Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;
