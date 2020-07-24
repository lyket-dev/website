export default function generateListenersManager() {
  const listeners = {};

  return [
    function addEffect(callback) {
      listeners[event] = listeners[event] || [];
      listeners[event].push(callback);
    },
    function emit(event, ...args) {
      (listeners[event] || []).forEach(cb => cb(...args));
    },
  ];
}
