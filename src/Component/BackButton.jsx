import './BackButton.css'
import '../App.css'
const BackButton = () => {
  return (
    <>
         <span  className='back' onClick={()=>{history.back()}}>
              <i className="fa-sharp fa-solid fa-arrow-left">&nbsp;</i>Back
         </span>
    </>
  )
}

export default BackButton
