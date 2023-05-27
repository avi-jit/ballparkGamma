import React from 'react'

export default function CreateRoom(props) {
    // eslint-disable-next-line
    const {questions, createGame, joiningRoom, setRoom} = props;
  return (
    <div>
        <button className="btn btn-secondary" style={{width:"34%", marginRight:"2%", borderRadius:"15px"}} onClick={createGame}>Create Game</button>
        <button className="btn btn-secondary " style={{width:"34%",borderRadius:"15px"}} onClick={setRoom}>Join Game</button>
    </div>
  )
}
