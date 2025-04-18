import { Task } from "@/lib/tasks";
import Avatar from "./Avatar";
import { User } from "lucide-react";
import useActiveBoard from "@/hooks/useActiveBoard";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { Popover } from "./ui/popover";

interface TaskCardProps {
  task: Task;
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const board = useActiveBoard();

  const assignedMembers = task.assignedMembers || [];

  const assignedMembersDetails = assignedMembers
    .map((memberId) => board.members.find((member) => member.id === memberId))
    .filter((user) => user !== undefined);

  const toggleAssignment = () => {
    return (memberId: string) => {
      const isAssigned = assignedMembers.includes(memberId);
      if (isAssigned) {
        task.assignedMembers = assignedMembers.filter((id) => id !== memberId);
      } else {
        task.assignedMembers = [...assignedMembers, memberId];
      }
    };
  }

  
  return (
    <div className="bg-white p-[8px] rounded-[4px]">
      <span className="text-[12px] text-gray-500">{task.id}</span>
      <h2 className="text-[14px] font-bold mb-[8px]">{task.title}</h2>
      {assignedMembers.length > 0 && (
        <div className="flex flex-wrap gap-[4px]">
          {assignedMembersDetails.map((member) => (
            <Avatar key={member.id} name={member.username} />
          ))}
        </div>
      )}
      <div className="flex items-center justify-end">
        <Popover>
          <PopoverTrigger>
            <User size={14} />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[200px]">
            {board.members.map((member) => (
              <div key={member.id} className="flex items-center gap-2" onClick={toggleAssignment(member.id)}>
                <Avatar name={member.username} />
                <span>{member.username}</span>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TaskCard;
