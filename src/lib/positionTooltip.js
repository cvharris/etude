export default function(target, tooltip, position) {
  const positionArgs = position.split(' ')
  let top = 0
  let left = 0

  // Target's side where tooltip appears
  switch (positionArgs[0]) {
    case 'bottom':
      top = target.offsetHeight
      break
    default:
  }

  // tooltip box alignment to target
  switch (positionArgs[1]) {
    case 'center':
      left =
        target.offsetLeft + target.offsetWidth / 2 - tooltip.offsetWidth / 2
      break
    default:
  }

  return {
    top,
    left
  }
}
