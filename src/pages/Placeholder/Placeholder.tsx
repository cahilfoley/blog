import * as React from 'react'
import classes from './styles.module.scss'
import useMousePosition from 'utils/hooks/useMousePosition'

import Square from './Shape'

const createPerspective = (
  clientX: number,
  clientY: number,
  severity: number,
) => {
  const posX = clientX - window.innerWidth / 2
  const posY = clientY - window.innerWidth / 6
  return [
    'perspective(500px)',
    `rotateY(${posX * severity}deg)`,
    `rotateX(${posY * -severity}deg)`,
  ].join(' ')
}

const Placeholder = () => {
  const [{ clientX, clientY }] = useMousePosition()

  const transform = createPerspective(clientX, clientY, 0.05)
  const transformSmall = createPerspective(clientX, clientY, 0.02)

  return (
    <div className={classes.root}>
      <div className={classes.background}>
        {Array(7)
          .fill('')
          .map((_, i) => (
            <Square
              index={i}
              key={i}
              transform={i < 3 ? transform : transformSmall}
            />
          ))}
      </div>
      <div className={classes.mainContent}>
        <h1>Under Construction</h1>
      </div>
    </div>
  )
}

export default Placeholder
