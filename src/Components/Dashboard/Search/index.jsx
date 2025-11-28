
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './styles.css'
const Search = ({search,onSearchChange}) => {
  return (
    <div>
      <div className="search-flex">
        <SearchRoundedIcon/>
        <input placeholder='Search' type='text' value={search} onChange={(e)=>{onSearchChange(e)}} />
      </div>
    </div>
  )
}

export default Search