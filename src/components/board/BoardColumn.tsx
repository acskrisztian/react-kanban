interface BoardColumnProps {
  title: string;
}
const BoardColumn: React.FC<BoardColumnProps> = ({ title }) => {
  return (
    <div className="p-[8px] lg:w-[250px] flex flex-col">
      <div className="flex items-center justify-between hover:bg-gray-600 px-[8px] py-[4px] rounded-sm group">
        <h2 className="text-[14px] font-bold">{title}</h2>
        <span className="text-[14px] opacity-0 group-hover:opacity-100">0 tasks</span>
      </div>
      <div></div>
      <div className="mt-auto">
        <button className="text-[12px] font-bold cursor-pointer">
          + Add Task
        </button>
      </div>
    </div>
  );
};

export default BoardColumn;
