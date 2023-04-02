import React from 'react'

export default function CreateRoom(props) {
    // eslint-disable-next-line
    const {questions, createGame, joiningRoom, setRoom} = props;
  return (
    <div>
        <button className="btn btn-info" style={{width:"34%", marginRight:"2%"}} onClick={createGame}>Create Game</button>
        <button className="btn btn-info " style={{width:"34%"}} onClick={setRoom}>Join Game</button>
    </div>
  )
}
