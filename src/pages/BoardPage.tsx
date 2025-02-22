import BoardColumn from "@/components/board/BoardColumn";
import BoardHeader from "@/components/board/BoardHeader";
import useActiveBoard from "@/hooks/useActiveBoard";

const BoardPage = () => {
  const board = useActiveBoard();

  return (
    <div className="p-[8px] flex-grow-1 flex flex-col">
      <BoardHeader title={board.title} />
      <div className="flex flex-grow">
        {board.columns.map((column) => (
          <BoardColumn key={column.id} title={column.title} />
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
