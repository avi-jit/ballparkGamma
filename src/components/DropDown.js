import React, {useState, useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import countryList from '../lib/countryList';
import styles from '../styles/dropdown.module.scss'
export default function DropDown(props) {
    const {countries,updateCountries} = props;
    const [checkedState, setCheckedState] = useState(
        new Array(countryList.length).fill(false)
      );
    const [count,setCount] = useState(1);
    const handleOnChange = (position) => {
        
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
        const countrySet = updatedCheckedState.reduce(
            (countr, currentState, index) => {
              if (currentState === true) {
                let x = new Set();
                countries.add(countryList[index]);
                x = countries 
                return x;
              }
              let x = new Set();
                countries.delete(countryList[index]);
                x = countries; 
                return x;
            },
            0
          );
        updateCountries(countrySet);
        
        
    }
    // eslint-disable-next-line
    useEffect(()=>{
        const checkCountries=()=>{
            const x = new Array(countryList.length).fill(false);
            const countryArr = Array.from(countries)
            for(let i=0; i<countryArr.length; i++){
                for(let j=0; j<countryList.length; j++){
                    if(countryArr[i]===countryList[j]){
                        x[j]=true;
                    }
                    //x[j] = true;
                }
            }
            setCheckedState(x);
        }
        if(count){checkCountries();}
        setCount(0);
    })
  return (
    <div>
        
          <Dropdown className={styles.dropDown} autoClose="outside">
            <Dropdown.Toggle id="dropdown-autoclose-outside" className="mt-2" style={{backgroundColor:"#006699"}}>
            Countries
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark" style={{overflowY:'scroll', maxHeight:"200px"}}>
              {countryList.map((country,index) => (<Dropdown.Item as="li" className = {styles.items} variant="dark">
                <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    
                    name={country}
                    value={country}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>  {country}</label></Dropdown.Item>))}
              
            </Dropdown.Menu>
          </Dropdown>

      
    </div>
  )
}
