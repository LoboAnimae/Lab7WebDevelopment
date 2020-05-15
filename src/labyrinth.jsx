/* eslint-disable no-alert */
import React, { useEffect } from 'react'

const W = parseInt(prompt('Please input a width'), 10)
const H = parseInt(prompt('Please input a height'), 10)

const style = {
  width: 'fit-content',
  height: 'fit-content',
  display: 'grid',
  gridAutoFlow: 'column',
}

const Creator = () => {
  const [labyrinth, setLabyrinth] = React.useState([])

  useEffect(() => {
    fetch(`http://quetzaluno.space:3001/?w=${H}&h=${W}&type=json`)
      .then((result) => result.json())
      .then((result) => setLabyrinth(result))
  }, [])

  const moveSomewhere = (event) => {
    let playerHolder = {}

    labyrinth.forEach((row, y) => {
      row.forEach((column, x) => {
        if (column === 'p' || column === 'q' || column === 'd' || column === 'b') {
          playerHolder = { x, y }
        }
      })
    })

    const newLabyrinth = JSON.parse(JSON.stringify(labyrinth))

    if (event.key === 'ArrowDown') {
      if (
        labyrinth[playerHolder.y][playerHolder.x + 1] === ' '
        || labyrinth[playerHolder.y][playerHolder.x + 1] === 'g'
      ) {
        newLabyrinth[playerHolder.y][playerHolder.x + 1] = 'd'
        newLabyrinth[playerHolder.y][playerHolder.x] = ' '
        setLabyrinth(newLabyrinth)
        playerHolder = {
          x: playerHolder.x + 1,
          y: playerHolder.y,
        }
      }
    }

    if (event.key === 'ArrowRight') {
      if (
        labyrinth[playerHolder.y + 1][playerHolder.x] === ' '
        || labyrinth[playerHolder.y + 1][playerHolder.x] === 'g'
      ) {
        newLabyrinth[playerHolder.y + 1][playerHolder.x] = 'b'
        newLabyrinth[playerHolder.y][playerHolder.x] = ' '
        setLabyrinth(newLabyrinth)
        playerHolder = {
          x: playerHolder.x,
          y: playerHolder.y + 1,
        }
      }
    }
    if (event.key === 'ArrowLeft') {
      if (
        labyrinth[playerHolder.y - 1][playerHolder.x] === ' '
        || labyrinth[playerHolder.y - 1][playerHolder.x] === 'g'
      ) {
        newLabyrinth[playerHolder.y - 1][playerHolder.x] = 'q'
        newLabyrinth[playerHolder.y][playerHolder.x] = ' '
        setLabyrinth(newLabyrinth)
        playerHolder = {
          x: playerHolder.x,
          y: playerHolder.y - 1,
        }
      }
    }
    if (event.key === 'ArrowUp') {
      if (
        labyrinth[playerHolder.y][playerHolder.x - 1] === ' '
        || labyrinth[playerHolder.y][playerHolder.x - 1] === 'g'
      ) {
        newLabyrinth[playerHolder.y][playerHolder.x - 1] = 'p'
        newLabyrinth[playerHolder.y][playerHolder.x] = ' '
        setLabyrinth(newLabyrinth)
        playerHolder = {
          x: playerHolder.x - 1,
          y: playerHolder.y,
        }
      }
    }

    if (playerHolder.x === labyrinth[0].length - 2 && playerHolder.y === labyrinth.length - 2) {
      setTimeout(() => {
        alert('You Won!!! (Game will restart on OK)')
      }, 2)
      window.location.reload()
    }
  }

  return (
    /* eslint-disable */
    <div role="form" onKeyDown={moveSomewhere} tabIndex="0" className="gridContainer" style={style}>
      {labyrinth.map((value, index) => (
        <pre key={index}>
          {/* eslint-enable */}
          {value.map((value2, index2) => {
            let placeholder = ''

            if (value2 === '|') {
              placeholder = './images/wall.png'
            } else if (value2 === '+') {
              placeholder = './images/corner.png'
            } else if (value2 === '-') {
              placeholder = './images/wall.png'
            } else if (value2 === ' ') placeholder = './images/Background.png'
            else if (value2 === 'p') {
              placeholder = './images/gifs/up.gif'
            } else if (value2 === 'd') {
              placeholder = './images/gifs/down.gif'
            } else if (value2 === 'q') {
              placeholder = './images/gifs/left.gif'
            } else if (value2 === 'b') {
              placeholder = './images/gifs/right.gif'
            } else if (value2 === 'g') {
              placeholder = './images/gifs/trainer.gif'
            }
            return (
              /* eslint-disable */
              <div key={index2}>
                {/* eslint-enable */}
                <img alt="element" style={{ width: '60px', height: '60px' }} src={placeholder} />
              </div>
            )
          })}
        </pre>
      ))}
    </div>
  )
}

export default Creator
