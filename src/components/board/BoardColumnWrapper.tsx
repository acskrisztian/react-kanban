import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { moveColumn } from '../../store/activeBoardSlice';
import BoardColumn from './BoardColumn';
import { RootState } from '../../store/store';

const BoardColumnWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const { columns, columnOrder } = useSelector((state: RootState) => state.activeBoard);

  const handleMoveColumn = (dragIndex: number, hoverIndex: number) => {
    const dragColumnId = columnOrder[dragIndex];
    dispatch(moveColumn({ columnId: dragColumnId, toIndex: hoverIndex }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 p-4 overflow-x-auto">
        {columnOrder.map((columnId, index) => {
          const column = columns.find(col => col.id === columnId);
          if (!column) return null;
          
          return (
            <BoardColumn
              key={column.id}
              id={column.id}
              title={column.title}
              index={index}
              moveColumn={handleMoveColumn}
            />
          );
        })}
      </div>
    </DndProvider>
  );
};

export default BoardColumnWrapper; 