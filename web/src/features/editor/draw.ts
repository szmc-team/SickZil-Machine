export interface Position2D {
  x: number
  y: number
}

export function drawLine(
  context: CanvasRenderingContext2D,
  prev: Position2D,
  curr: Position2D
) {
  context.beginPath()
  context.moveTo(prev.x, prev.y)
  context.lineTo(curr.x, curr.y)
  context.strokeStyle = 'red'
  context.lineWidth = 5
  context.stroke()
  context.closePath()
}
