// import { useEffect, useRef, useCallback } from 'react';
//
// export default function useClickOutside<T extends HTMLElement>(handler) {
//   const ref = useRef<T>(null);
//
//   const handleClick = useCallback(
//     function handleClick(e) {
//       if (ref.current && ref.current.contains(e.target)) {
//         return;
//       }
//
//       handler();
//     },
//     [handler],
//   );
//
//   useEffect(() => {
//     document.addEventListener('click', handleClick);
//     return () => document.removeEventListener('click', handleClick);
//   }, []);
//
//   return ref;
// }
