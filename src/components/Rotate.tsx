import * as React from 'react'
import classes from './styles.module.scss'

type RotateProps = {
  children: React.ReactChild
  /** Animation duration in milliseconds */
  duration: number
}

const Rotate = (props: RotateProps) => (
  <div
    className={classes.rotate}
    style={{ animationDuration: `${props.duration}ms` }}
  >
    {props.children}
  </div>
)

export default Rotate
