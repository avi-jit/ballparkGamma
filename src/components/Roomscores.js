import React, {useEffect,useState} from 'react'
import supabase from "./config/supabaseClient"




export default function Roomscores(props) {
    const {createdRoom} = props;
    
    const [scoreDict, setScoreDict] = useState({})
    const [scoreArr,setScoreArr] = useState([])
    useEffect(()=>{
        const fetchScores = async()=>{
            const {data,error}=await supabase.from('gameRoom').select('*').eq('id',createdRoom);
            if(data){
                setScoreDict(data[0].scores);
            }
            if(error){
                console.log(error)
            }
        }
        const makeArray=()=>{
            var items = Object.keys(scoreDict).map(function(key){
                return[key, scoreDict[key]];
            });
            items.sort(function(first,second){
                return second[1]-first[1];
            });
            setScoreArr(items);

        }
        fetchScores();
        makeArray();
    },[createdRoom,scoreDict])
    
  return (
    <div>
        <table className="table table-dark table-striped" style={{marginTop:"20px"}}>
            <thead>
                <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
            {
            scoreArr.map((key,index)=>(
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{key[0]}</td>
                    <td>{key[1]}</td>
                </tr>
            ))
        }

            </tbody>
        </table>
        
    </div>
  )
}
