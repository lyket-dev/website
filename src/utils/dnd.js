export function getNewPosition(list, pendingMovement, attribute = "position") {
  let position = 0;

  if ("index" in pendingMovement.destination) {
    const hover = list[pendingMovement.destination.index];

    if (hover) {
      position = hover.attributes[attribute];
    } else {
      position = list[list.length - 1].attributes[attribute] + 1;
    }
  }

  return position;
}

export function reorder(list, pendingMovement) {
  if (!pendingMovement) {
    return list;
  }
  const {
    source: { index: startIndex },
    destination: { index: endIndex },
  } = pendingMovement;

  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
