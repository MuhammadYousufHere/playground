import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
const items = [
  { id: 'd-id-c', name: 'ali' },
  { id: 'd-id-cc', name: 'ali-1' },
  { id: 'd-id-c3c', name: 'ali-2' },
  { id: 'd-id-cvc', name: 'ali-3' },
  { id: 'd-id-ctc', name: 'ali-4' },
];
const Items = () => {
  const [users, updateUsers] = React.useState(items);
  function handleDrangEnd(result) {
    if (!result.destination) return; // no destination , get out

    const list = Array.from(items);
    const [reorder] = list.slice(result.source.index, 1);
    list.splice(result.destination.index, 0, reorder);

    updateUsers(list);
  }
  return (
    <DragDropContext onDragEnd={handleDrangEnd}>
      <Droppable droppableId='user'>
        {(provided) => (
          <div
            className='user'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {users.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                      padding: '1rem',
                      border: '1px solid tomato',
                      width: '40%',
                      margin: '1rem',
                    }}
                  >
                    <h2>
                      {' '}
                      <FontAwesomeIcon icon={faSmile} /> {item.name}
                    </h2>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Items;
