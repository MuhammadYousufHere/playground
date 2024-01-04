import { useEffect, useRef } from 'react';

const useEventListener = (
    eventType = '',
    listener = () => null,
    target = window,
    options = null
) => {
    // store and presist listner function accross renders
    const savedListner = useRef();
    useEffect(() => {
        savedListner.current = listener;
    }, [listener]);

    useEffect(() => {
        if (!target?.addEventListener) return;

        const eventListener = (e) => savedListner.current(e);
        target.addEventListener(eventType, eventListener, options);
        return () => {
            target.removeEventListener(eventType, eventListener, options);
        };
    }, [eventType, target, options]);
};

export default useEventListener;

// usage
// const onClose = () {}
// const dialogRef = useRef()
// useEventListener('mousedown',(e)=>{
//   if(e.defaultPrevented){
//     return; //do nothing if the event was already processed
//   }
//   if(dialogRef.current && !dialogRef.current.contains(e.target)){
//     console.log('outside click')
//     onClose()
//   }
// },window)
