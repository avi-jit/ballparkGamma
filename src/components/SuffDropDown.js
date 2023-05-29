import React, {useState, useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import suffList from '../lib/suffList';
import studySuff from '../lib/studySuff';
import styles from '../styles/dropdown.module.scss'
export default function SuffDropDown(props) {
    const {suffix,updateSuffix} = props;
    const [checkedState, setCheckedState] = useState(
        new Array(suffList.length).fill(false)
      );
    const [count,setCount] = useState(1);
    const selectAll = ()=>{
        setCheckedState(new Array(suffList.length).fill(true))
    }
    const deSelectAll = ()=>{
        setCheckedState(new Array(suffList.length).fill(false))
    }
    const handleOnChange = (position) => {
        
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
        const suffSet = updatedCheckedState.reduce(
            (countr, currentState, index) => {
              if (currentState === true) {
                let x = new Set();
                suffix.add(suffList[index]);
                x = suffix 
                return x;
              }
              let x = new Set();
                suffix.delete(suffList[index]);
                x = suffix; 
                return x;
            },
            0
          );
        updateSuffix(suffSet);
        
        
    }
    // eslint-disable-next-line
    useEffect(()=>{
        const checksuffix=()=>{
            const x = new Array(suffList.length).fill(false);
            const suffArr = Array.from(suffix)
            for(let i=0; i<suffArr.length; i++){
                for(let j=0; j<suffList.length; j++){
                    if(suffArr[i]===suffList[j]){
                        x[j]=true;
                    }
                    //x[j] = true;
                }
            }
            setCheckedState(x);
        }
        if(count){checksuffix();}
        setCount(0);
    })
  return (
    <div>
        
          <Dropdown className={styles.dropDown} autoClose="outside">
            <Dropdown.Toggle id="dropdown-autoclose-outside" className="mt-2" style={{backgroundColor:"grey", borderRadius:"15px"}}>
            Select Decks
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark" style={{overflowY:'scroll', maxHeight:"200px"}}>
            <Dropdown.Item as="li" className = {styles.items} variant="dark"><button className='btn btn-secondary rounded-pill' onClick={selectAll}>Select All</button></Dropdown.Item>
            <Dropdown.Item as="li" className = {styles.items} variant="dark"><button className='btn btn-secondary rounded-pill' onClick={deSelectAll}>Deselect All</button></Dropdown.Item>
              {suffList.map((suff,index) => (<Dropdown.Item as="li" className = {styles.items} variant="dark">
                <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    
                    name={studySuff[suff]}
                    value={suff}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>  {suff}</label></Dropdown.Item>))}
              
            </Dropdown.Menu>
          </Dropdown>

      
    </div>
  )
}
