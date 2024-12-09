import './Choose.css'
import SearchContainer from './SearchContainer'
import SelectManue from './SelectManue'

const Choose = ({setQuery}) => {
  return (
    <>
       <div className="chooseContainer">
           <SearchContainer setQuery={setQuery}/>
           <SelectManue setQuery={setQuery}/>
       </div>
      
    </>
  )
}

export default Choose
