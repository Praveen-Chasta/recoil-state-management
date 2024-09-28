import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import '../App.css';
import { useParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { challengesState } from '../recoil/atoms/atoms';

function Update() {
  const { id: challengeId } = useParams(); 
  const challenges = useRecoilValue(challengesState)
  const setChallenge = useSetRecoilState(challengesState)

  // State variables for the challenge form
  const [challengeName, setChallengeName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [level, setLevels] = useState('Easy');

  // Load the existing challenge data when the component mounts

  useEffect(() => {
     const existingChallenge = challenges.find((id) => id.id === parseInt(challengeId))
     if(existingChallenge){
        setChallengeName(existingChallenge.name);
        setStartDate(new Date(existingChallenge.startDate));
        setEndDate(new Date(existingChallenge.endDate));
        setDescription(existingChallenge.description);
        setLevels(existingChallenge.levels);
     }
  },[challenges, challengeId])

  const updateChallenge = () => {
    const now = new Date();
    let status = '';

    if (endDate < now) {
      status = "Past";
    } else if (startDate > now) {
      status = "Upcoming";
    } else {
      status = "Active";
    }

    const updatedChallenge = {
      id: Number(challengeId), // Keep the same ID for the existing challenge
      name: challengeName,
      startDate,
      endDate,
      description,
      level,
      status
    };

    // Update the challenges array with the updated challenge
    const updatedChallenges = challenges.map((item) => 
        item.id === parseInt(challengeId) ? updatedChallenge : item
    )

    setChallenge(updatedChallenges)

    toast.success('Challenge updated successfully!', {
      duration: 4000,
      position: 'top-center',
    });

    // Reset form fields
    setChallengeName("");
    setStartDate(new Date());
    setEndDate(new Date());
    setDescription('');
    setLevels("Easy");
  };

  return (
    <>
      <h1>Update Challenge</h1>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="challengeName">Challenge Name</label>
          <input 
            type="text" 
            id="challengeName" 
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
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
            onChange={(date) => setEndDate(date)}
            className="date-picker"
            dateFormat="yyyy/MM/dd h:mm aa"
            showTimeSelect
            timeIntervals={5}
            timeCaption="Time"
            placeholderText="Select end date and time"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className='form-group'>
          <select value={level} onChange={(e) => setLevels(e.target.value)}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <button onClick={updateChallenge}>Update Challenge</button>
      </div>
    </>
  );
}

export default Update;
