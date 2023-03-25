import React from 'react'

export default function CreateRoom(props) {
    // eslint-disable-next-line
    const {questions, createGame} = props;
  return (
    <div>
        <button className="btn btn-primary" style={{width:"30%"}} onClick={createGame}>Create Game</button>
    </div>
  )
}
