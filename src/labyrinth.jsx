/*eslint-disable*/
import React, { useEffect } from 'react'
// const W = parseInt(prompt('Please input a width'))
const W = 2
const H = 2
// const H = parseInt(prompt('Please input a height'))
// const B = 10

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
        if (column == 'p' || column == 'q' || column == 'd' || column == 'b') {
          playerHolder = {x, y}
        }
      })
    })

    const newLabyrinth = JSON.parse(JSON.stringify(labyrinth))

    if (event.key == 'ArrowDown') {
      if (labyrinth[playerHolder.y][playerHolder.x+1] == ' '|| labyrinth[playerHolder.y][playerHolder.x+1] == 'g'){
        console.log('ArrowDown')
        newLabyrinth[playerHolder.y][playerHolder.x+1] = 'd'
        newLabyrinth[playerHolder.y][playerHolder.x] = ' '
        setLabyrinth(newLabyrinth)
        playerHolder = {
          x: playerHolder.x+1,
          y: playerHolder.y
        }
      }
    }

    if (event.key == 'ArrowRight') {
      if (labyrinth[playerHolder.y+1][playerHolder.x] == ' '|| labyrinth[playerHolder.y+1][playerHolder.x]== 'g'){
        newLabyrinth[playerHolder.y+1][playerHolder.x] = 'b'
        newLabyrinth[playerHolder.y][playerHolder.x] = ' '
        setLabyrinth(newLabyrinth)
        playerHolder = {
          x: playerHolder.x,
          y: playerHolder.y+1
        }
      }
    }
    if (event.key == 'ArrowLeft') {
      if (labyrinth[playerHolder.y-1][playerHolder.x] == ' ' || labyrinth[playerHolder.y-1][playerHolder.x] == 'g'){
        newLabyrinth[playerHolder.y-1][playerHolder.x] = 'q'
        newLabyrinth[playerHolder.y][playerHolder.x] = ' '
        setLabyrinth(newLabyrinth)
        playerHolder = {
          x: playerHolder.x,
          y: playerHolder.y-1
        }
      }
    }
    if (event.key == 'ArrowUp') {
      if (labyrinth[playerHolder.y][playerHolder.x-1] == ' ' || labyrinth[playerHolder.y][playerHolder.x-1] == 'g'){
        newLabyrinth[playerHolder.y][playerHolder.x-1] = 'p'
        newLabyrinth[playerHolder.y][playerHolder.x] = ' '
        setLabyrinth(newLabyrinth)
        playerHolder = {
          x: playerHolder.x-1,
          y: playerHolder.y
        }
      }
    }

    console.log(playerHolder, W-1, H-1, labyrinth.length, labyrinth[0].length)
    if(playerHolder.x == labyrinth[0].length-2 && playerHolder.y == labyrinth.length-2){
      setTimeout(() => {
        alert('You win')
      }, 2)
    }
  }

  return (
    <div onKeyDown={moveSomewhere} tabIndex="0" className='gridContainer' style={style}>
      {labyrinth.map((value, index) => {
        if (value == '+') console.log('True')
        
        return <pre key={index}> 
        {value.map((value2, index2) => {
          let placeholder = ''
          let innerStyle = {}
          if (value2 == '|') {
            placeholder = './images/wall.png'
            innerStyle = {}
          }
          else if (value2 == '+') {
            placeholder = './images/corner.png'
            innerStyle = {}
          }
          else if (value2 == '-') {
            placeholder = './images/wall.png'
            innerStyle = {}
          }
          else if (value2 == ' ') placeholder = './images/space.png'
          else if (value2 == 'p') {
            placeholder = 'http://placekitten.com/600/400'
          }
          else if (value2 == 'd') {
            placeholder = 'http://placekitten.com/600/350'
          }
          else if (value2 == 'q') {
            placeholder = 'http://placekitten.com/300/500'
          }
          else if (value2 == 'b') {
            placeholder = 'http://placekitten.com/250/600'
          }
          else if (value2 =='g') {
            placeholder = './images/goal.png'
            innerStyle = {
              
            }
          }
          return <div key={index2}><img style={{ width: '60px', height: '60px',}} src={placeholder} /></div>
        })}
         </pre>
      })}
    </div>
  )
}

export default Creator
