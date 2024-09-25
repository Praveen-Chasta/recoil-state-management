import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { challengesState } from '../recoil/atoms/atoms'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from 'react-hot-toast'
import '../App.css';


function Create() {
  
  const [challenges, setChallenges] = useRecoilState(challengesState)
  const [challengeName, setchallengeName] = useState()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [description, setDescription] = useState()
  const [level, setLevels] = useState()

  const makeChallenge = () => {

    const now = new Date();
    let status = ''

    if (endDate < now){
        status = "Past"
    }else if (startDate > now) {
        status = "Upcoming"
    } else{
        status = "Active"
    }

    const newChallenge = {
        id : challenges.length + 1,
        name : challengeName,
        startDate,
        endDate,
        description,
        level,
        status
    }


    setChallenges([...challenges, newChallenge])

    console.log(newChallenge)

    console.log(challenges)

    toast.success('Challenge created successfully!', {
        duration: 4000,
        position: 'top-center',
      });

    setchallengeName("")
    setStartDate(new Date())
    setEndDate(new Date())
    setDescription('')
    setLevels("Easy")

    console.log(newChallenge)
  }

  return (
    <>
      <h1>Create Challenges</h1>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="challengeName">Challenge Name</label>
          <input type="text" id="challengeName" onChange = {(e) => setchallengeName(e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange = {(date) => setStartDate(date)}
            className="date-picker"
            dateFormat="yyyy/MM/dd h:mm aa"
            showTimeSelect
            timeIntervals={5}
            timeCaption="Time"
            placeholderText="Select start date and time"
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <DatePicker
            selected={endDate}
            onChange = {(date) => setEndDate(date)}
            className="date-picker"
            dateFormat="yyyy/MM/dd h:mm aa"
            showTimeSelect
            timeIntervals={5}
            timeCaption="Time"
            placeholderText="Select start date and time"
          />
        </div>
        <div className="form-group">
            <label>Text Area</label>
            <input type = "textarea" onChange = {(e) => setDescription(e.target.value)}/>
        </div>
        
        <div className='form-group'>
            <select onChange = {(e) => setLevels(e.target.value)}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>
        </div>
        <button onClick = {makeChallenge}>Create Challenge</button>
      </div>
    </>
  );
}

export default Create;
