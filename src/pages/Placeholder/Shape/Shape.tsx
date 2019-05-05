import * as React from 'react'
import classNames from 'classnames'
import classes from './styles.module.scss'
import Rotate from 'components/Rotate'

type ShapeProps = {
  index: number
  transform: string
}

const getClassAndIndex = (base: string, index: number, suffix?: string) => {
  let parts = [[base], [base, index]]
  if (typeof suffix === 'string') parts = parts.map(part => [...part, suffix])

  const resolvedParts = parts.map(path => classes[path.join('_')])
  return classNames(...resolvedParts)
}

const Shape = (props: ShapeProps) => (
  <div
    className={getClassAndIndex('wrapper', props.index)}
    style={{ transform: props.transform }}
  >
    <Rotate duration={(props.index * 3 + 3) * 4000}>
      <div className={getClassAndIndex('shape', props.index)}>
        <div className={getClassAndIndex('shape', props.index, 'inner')}>
          <div className={getClassAndIndex('shape', props.index, 'content')} />
        </div>
      </div>
    </Rotate>
  </div>
)

export default Shape
