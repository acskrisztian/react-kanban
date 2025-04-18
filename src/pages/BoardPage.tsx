import BoardColumnWrapper from "@/components/board/BoardColumnWrapper";
import BoardHeader from "@/components/board/BoardHeader";
import useActiveBoard from "@/hooks/useActiveBoard";
const BoardPage =  () => {
  const board = useActiveBoard();

  return (
    <div className="p-[8px] flex-grow-1 flex flex-col">
      <BoardHeader title={board.title} />
      <div className="flex flex-grow">
        <BoardColumnWrapper/>
      </div>
    </div>
  );
};

export default BoardPage;
