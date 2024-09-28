import Filter from './Filter'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {challengesState, filterState} from '../recoil/atoms/atoms'
import Countdown from 'react-countdown';
import {Link} from 'react-router-dom'
import { toast } from 'react-hot-toast';

function Cards() {

  const challenges = useRecoilValue(challengesState);
  const filter = useRecoilValue(filterState)
  const setChallenge = useSetRecoilState(challengesState)

  const getStatusClass = (value) => {
    switch(value){
      case "Active":
        return "status-active";
      case "Past":
        return "status-past";
      case "Upcoming":
        return "status-upcoming";
      default :
        return '';
      }
    }
  
    const formatPastDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

  const formatDoubleDigit = (value) => value.toString().padStart(2, '0')


  const checkCurrentStatus = (startDate, endDate) => {
    const now = new Date();

    if(now < startDate){
      return "Upcoming"
    }
    else if(now > endDate ){
      return "Past"
    }
    else{
      return "Active"
    }
  } 
  
  const filteredChallenges = challenges.filter((challenge) => {
      const startDate = new Date(challenge.startDate)
      const endDate = new Date(challenge.endDate)
      const currentStatus = checkCurrentStatus(startDate, endDate)

      if(filter.status.length > 0 && !filter.status.includes("All") && !filter.status.includes(currentStatus)){
        return false
      }

      if(filter.levels.length > 0 && !filter.levels.includes(challenge.level)){
        return false
      }

      if(filter.searchTerms && !challenge.name.toLowerCase().includes(filter.searchTerms.toLowerCase())){
        return false
      }

      return true
  })

  const deleteItem = (id) => {
    const updatedChallenges = challenges.filter((item) => item.id !== id);
    setChallenge(updatedChallenges);
    toast.success('Challenge deleted successfully!', {
      duration: 4000,
      position: 'top-center',
    });
  };

  return (
    <div>
        <Filter />
        {filteredChallenges.map((challenge) => {
          const startDate = new Date(challenge.startDate)
          const endDate = new Date(challenge.endDate)
          const currentStatus = checkCurrentStatus(startDate, endDate)

          let countdown;
          let statusText

          if (currentStatus === 'Active') {
              countdown = (
                <Countdown 
                  date={endDate} 
                  renderer={({ days, hours, minutes }) => (
                    <div className="">
                      <div className="">
                        <span className="">{formatDoubleDigit(days)}</span>
                        <span className="">Days</span>
                      </div>
                      <span className="">:</span>
                      <div className="">
                        <span className="">{formatDoubleDigit(hours)}</span>
                        <span className="">Hours</span>
                      </div>
                      <span className="">:</span>
                      <div className="">
                        <span className="">{formatDoubleDigit(minutes)}</span>
                        <span className="">Min</span>
                      </div>
                    </div>
                  )}
                />
              );
              statusText = 'Ends in';
            } else if (currentStatus === 'Upcoming') {
              countdown = (
                <Countdown 
                  date={startDate} 
                  renderer={({ days, hours, minutes }) => (
                    <div className="">
                      <div className="">
                        <span className="">{formatDoubleDigit(days)}</span>
                        <span className="">Days</span>
                      </div>
                      <span className="">:</span>
                      <div className="">
                        <span className="">{formatDoubleDigit(hours)}</span>
                        <span className="">Hours</span>
                      </div>
                      <span className="">:</span>
                      <div className="">
                        <span className="">{formatDoubleDigit(minutes)}</span>
                        <span className="">Min</span>
                      </div>
                    </div>
                  )}
                />
              );
              statusText = 'Starts in';
            } else if (currentStatus === 'Past') {
              countdown = formatPastDate(endDate);
              statusText = 'Ended on';
            }

          return(
                <>
                  <h1>{challenge.id}</h1>
                  <p className={getStatusClass(currentStatus)}>{currentStatus}</p>
                  <h4 className="challenge-title">{challenge.name}</h4>
                  <p className="starts-in">{statusText}</p>
                  <p className="countdown">{countdown}</p>
                  <p>{challenge.levels}</p>
                  <p>{challenge.level}</p>
                  <Link to={`/challenge-update/${challenge.id}`}>
                    <button>Update</button>
                  </Link>
                  <button onClick = {() => deleteItem(challenge.id)}>Delete</button>
                </>
          )

        })}
    </div>
  )
}

export default Cards





