import { useEffect, useState } from 'react';

const MouseData = {
    clientX: null,
    clientY: null,
    movementX: null,
    movementY: null,
    offsetX: null,
    offsetY: null,
    pageX: null,
    pageY: null,
    screenX: null,
    screenY: null,
    x: null,
    y: null,
};
function getMousePositionFromEvent(event) {
    const {
        screenX,
        screenY,
        movementX,
        movementY,
        pageX,
        pageY,
        clientX,
        clientY,
        offsetX,
        offsetY,
    } = event;

    return {
        clientX,
        clientY,
        movementX,
        movementY,
        offsetX,
        offsetY,
        pageX,
        pageY,
        screenX,
        screenY,
        x: screenX,
        y: screenY,
    };
}
/**
 * useMouse hook
 *
 * Retrieves current mouse position and information about the position like
 * screenX, pageX, clientX, movementX, offsetX
 */
const useMouse = () => {
    const [mousePosition, setMousePosition] = useState(MouseData);
    function updateMousePosition(event) {
        setMousePosition(getMousePositionFromEvent(event));
    }
    useEffect(() => {
        document.addEventListener('mousemove', updateMousePosition);

        return () => {
            document.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};

export default useMouse;

// usage
// const { x, y } = useMouse();
