/* eslint-disable*/
import React, { useEffect } from 'react'

const W = 5
const H = 5
const B = 10


const style = {
  width: 'fit-content',
  height: 'fit-content',
  display: 'grid',
  gridTemplateColumns: `repeat()`,
  gridTemplateRows: 'fit-content(100px)',

}

const Creator = () => {
  const [labyrinth, setLabyrinth] = React.useState([])
  useEffect(() => {
    fetch(`http://quetzaluno.space:3001/?w=${W}&h=${H}&type=json`)
      .then((result) => result.json())
      .then((result) => setLabyrinth(result))
  }, [])

  if (labyrinth[0] != null )
  {
    for(let i = 0; i < H - 1; i++){
      for(let j = 0; j < H - 1; j++) 
      {
        console.log(`[${labyrinth[i]}, ${labyrinth[j]}]`)
      }
    }
  }
  let k = 0
  return (
    <div className="gridContainer" style={style}>
      {
        labyrinth.map((value) => {
        for (k = 0, k < value.length - 1; k++){
          return <pre>{value[k]}</pre>
          }
        )}
      }
    </div>
  )
}

export default Creator
