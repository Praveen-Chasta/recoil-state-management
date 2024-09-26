import { filterState } from '../recoil/atoms/atoms'
import { useCallback, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

function Filter() {

  const [filter, setFilters] = useRecoilState(filterState)
  const [search, setSearch] = useState("")
  const [debounce, setDebounced] = useState(search)

  useEffect(() => {
    const value = setTimeout(() => {
        setDebounced(search)
        console.log("Debounced value:", search);
    },300)

    return() => {
      clearTimeout(value)
    }
  },[search])

  const searchThings = (event) => {
      const input = event.target.value
      setSearch(input)
  }

  const onChangeStatus = (event) => {
    const {name, checked} = event.target
    let updatedStatus = [...filter.status]

    if(name === "All"){
      updatedStatus = checked ? ["All"] : []
    }
    else{
      if(checked){
        if(!updatedStatus.includes(name) && !updatedStatus.includes("All")){
          updatedStatus.push(name)
        }
      }
      else{
        updatedStatus = updatedStatus.filter((status) => status !== name)
        if(updatedStatus.length > 0 && updatedStatus.includes("All")){
          updatedStatus = updatedStatus.filter((status) => status !== "All")
        }
      }
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status : updatedStatus
    }))

    console.log(updatedStatus)
  }

  const onChangeLevel = (event) => {
    const { name, checked } = event.target
    let updateLevel = [...filter.levels]

    if(checked){
      if(!updateLevel.includes(name)){
        updateLevel.push(name)
      }
    }else{
      updateLevel = updateLevel.filter((level) => level !== name)
    }

    setFilters((prev) => ({
      ...prev,
      levels : updateLevel
    }))
    
    console.log(updateLevel)
  }

  return (
    <div>
      <h3>Filter Options</h3>
        <input 
          type="text" 
          placeholder="Search..." 
          onChange = {searchThings}
        />
      <br/>
      <label>
        <input type="checkbox" name="All" checked = {filter.status.includes("All")} onChange = {onChangeStatus}/> All
      </label>
      <br />
      <label>
        <input type="checkbox" name="Active" checked = {filter.status.includes("Active")} onChange = {onChangeStatus}/> Active
      </label>
      <br />
      <label>
        <input type="checkbox" name="Past" checked = {filter.status.includes("Past")} onChange = {onChangeStatus}/> Past
      </label>
      <br />
      <label>
        <input type="checkbox" name="Upcoming" checked = {filter.status.includes("Upcoming")} onChange = {onChangeStatus}/> Upcoming
      </label>
      <br />
      <label>
        <input type="checkbox" name="Easy" checked = {filter.levels.includes("Easy")} onChange = {onChangeLevel}/> Easy
      </label>
      <br />
      <label>
        <input type="checkbox" name="Medium" checked = {filter.levels.includes("Medium")} onChange = {onChangeLevel}/> Medium
      </label>
      <br />
      <label>
        <input type="checkbox" name="Hard" checked = {filter.levels.includes("Hard")} onChange = {onChangeLevel}/> Hard
      </label>
    </div>
  );
}

export default Filter;
