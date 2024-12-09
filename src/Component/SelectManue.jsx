import './SelectManue.css';

const SelectManue = ({setQuery}) => {
  return (
    <div className="selectContainer" onChange={(e)=>setQuery(e.target.value.toLowerCase())}>
      <select className="SelectManue">
        <option hidden>Filter by region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default SelectManue;
