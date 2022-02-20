import styled from "styled-components";
import ax from "axios";
import { useState } from "react";
import {
  Switch,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Box,
  Slider,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { bgpopup, popuptext } from "@/utils/variables";
import { useTheme } from "@/utils/provider";
// import SearchIcon from '@mui/icons-material/Search';
import { Search, Radio, Button, Icon } from "semantic-ui-react";
import FormControlLabel from '@mui/material/FormControlLabel';
import { basicColor, whiteblack } from "@/utils/variables";

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.colbg};  
  width: 100%;
  padding: 2.5rem 1rem 2rem;   
`;

const FlexHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  @media only screen and (min-width: 681px) and (max-width: 870px) {
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 680px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const LogoCont = styled.a`
  display: block;
  margin: 0 1rem;

`

const Image = styled.img`
  min-width: 144px;
  height: 36px;
  object-position:"left center",
  object-fit: contain;
  display: block;
`

const SearchBar = styled.input`
  width: 40%;
  height: 3rem;
  border: solid 1px #B08584;
  border-radius: 30px;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  margin-right: 2rem;

  @media only screen and (min-width: 1px) and (max-width: 870px) {
    width: 80%;
    margin: 1rem;
  }
  
`

// const SearchIcon = styled.a`
//   background-image: url('./images/Icon_search.svg');
//   background-position: center;
//   background-repeat: no-repeat;  
//   display: block;
//   width: 24px; height: 24px;
//   position: absolute;
  
// `

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.rowbg};
  flex-wrap: wrap;

  @media only screen and (max-width: 820px) {
  //   flex-direction: column;
  //   justify-content: center;
  // }
`;

const SwitchCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
`

const DurationCont = styled.div`
  min-width: 300px;
  margin: 25px 15px 0 15px;
`;

const genre = ["Documentaries", "Children & Family Movies", "Dramas"];

const rating = ["TV-MA", "TV-14", "R", "TV-PG", "PG-13"];

const country = ["Canada"];

const sortby = [
  "Date (newest)",
  "Date (oldest)",
  "Alphabet A-Z",
  "Alphabet Z-A",
  "Most Reviews",
];

const Header = ({
  rowbg = bgpopup,
  colbg = bgpopup,
  src = "./images/watchflix_logo.png",
  //onInput = (event) => {},
  onInput=()=>{},
  changeView = () => {},
  changeColor = () => {},
  // onPosterBox = () => {},
  // onHorizontal = () => {}
}) => {
  const { theme } = useTheme();
  const [label, setLabel] = useState();
  //const [label2, setLabel2] = useState(false);
 


  const [genreName, setGenreName] = useState([]);
  const handleGenre = (event) => {
    const {
      target: { value },
    } = event;
    setGenreName(typeof value === "string" ? value.split(",") : value);
  };

  const [ratingName, setRatingName] = useState([]);
  const handleRating = (event) => {
    const {
      target: { value },
    } = event;
    setRatingName(typeof value === "string" ? value.split(",") : value);
  };

  const [countryName, setCountryName] = useState([]);
  const handleCountry = (event) => {
    const {
      target: { value },
    } = event;
    setCountryName(typeof value === "string" ? value.split(",") : value);
  };

  const [sortbyName, setSortbyName] = useState([]);
  const handleSortby = (event) => {
    const {
      target: { value },
    } = event;
    setSortbyName(typeof value === "string" ? value.split(",") : value);
  };

  function duration(dur) {
    return `${dur} minutes`;
  }
  const [dur, setDur] = useState([60, 80]);
  const handleDur = (event, newDur) => {
    setDur(newDur);
  };

  return (
    <FlexCol>
{/* =================== HEADER STARTS =================== */}
      <FlexHeader>
        <LogoCont
          href="/"
        >
          <Image
            src={src}
            alt="Watchflix logo"          
          />
        </LogoCont>
        {/* <Search fluid/> */}
        <SearchBar
          placeholder="Search for a Movie Title..."
          //onChange={(event) => onInput(event.target.value)}
          onChange={onInput}
        /> 
        <FlexRow rowbg={rowbg[theme]}>
          {/* <Input icon='search' type='text' placeholder='Search...' autoWidth/> */}
          {/* <Switch onChange={changeColor} name="Dark Mode" />
          <Switch onChange={changeView} /> */}

          <SwitchCont>
            <FormControlLabel
              control={<Switch onChange={changeColor||setLabel(!label)} name="Dark Mode" />}
              //label="Dark Mode"
              label = {label || theme === 'light'? "Dark Mode":"Light Mode"}
              className="labelColor"
              sx={{ backgroundColor: "rgba(0,0,0,0)"  }}
              />
            <FormControlLabel
              control={<Switch onChange={changeView} name="List View" />}
              label="List View"
              className="labelColor"
              sx={{ backgroundColor: "rgba(0,0,0,0)" }}
            />
          </SwitchCont>

          {/* <Radio toggle/> */}
          {/* <Button.Group>
            <Button icon onClick={() => {onPosterBox()}}>
              <Icon name='grid layout'/>
            </Button>
            <Button icon >
              <Icon name='list'/>
            </Button>
          </Button.Group> */}
        </FlexRow>
      </FlexHeader>
{/* =================== HEADER ENDS =================== */}

      <FlexRow>
        <FormControl size="small" sx={{ width: "19%" }}>
          <InputLabel id="select-genre">Genre</InputLabel>
          <Select
            labelId="select-genre"
            multiple
            value={genreName}
            onChange={handleGenre}
            input={<OutlinedInput label="Genre" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {genre.map((genre) => (
              <MenuItem key={genre} value={genre}>
                <Checkbox checked={genreName.indexOf(genre) > -1} />
                <ListItemText primary={genre} />
              </MenuItem>
            ))}
            <FlexRow>
              <Button>Clear</Button>
              <Button>Apply</Button>
            </FlexRow>
          </Select>
        </FormControl>

        {/* https://mui.com/components/slider/#minimum-distance */}
        <FormControl size="small" sx={{ width: "19%" }}>
          <InputLabel id="select-duration">Duration</InputLabel>
          <Select
            labelId="select-duration"
            multiple
            value={dur}
            onChange={handleDur}
            input={<OutlinedInput label="Duration" />}
            renderValue={(selected) => selected.join(" - ")}
          >
            <DurationCont>
              <Slider
                value={dur}
                onChange={handleDur}
                valueLabelDisplay="auto"
                getAriaValueText={duration}
              />
            </DurationCont>
            <FlexRow>
              <Button>Clear</Button>
              <Button>Apply</Button>
            </FlexRow>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: "19%" }}>
          <InputLabel id="select-rating">Rating</InputLabel>
          <Select
            labelId="select-rating"
            multiple
            value={ratingName}
            onChange={handleRating}
            input={<OutlinedInput label="Rating" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {rating.map((rating) => (
              <MenuItem key={rating} value={rating}>
                <Checkbox checked={ratingName.indexOf(rating) > -1} />
                <ListItemText primary={rating} />
              </MenuItem>
            ))}
            <FlexRow>
              <Button>Clear</Button>
              <Button>Apply</Button>
            </FlexRow>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: "19%" }}>
          <InputLabel id="select-country">Country</InputLabel>
          <Select
            labelId="select-country"
            multiple
            value={countryName}
            onChange={handleCountry}
            input={<OutlinedInput label="Country" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {country.map((country) => (
              <MenuItem key={country} value={country}>
                <Checkbox checked={countryName.indexOf(country) > -1} />
                <ListItemText primary={country} />
              </MenuItem>
            ))}
            <FlexRow>
              <Button>Clear</Button>
              <Button>Apply</Button>
            </FlexRow>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: "19%" }}>
          <InputLabel id="select-sortby">Sort By...</InputLabel>
          <Select
            labelId="select-sortby"
            // multiple
            value={sortbyName}
            // label='Sort By'
            onChange={handleSortby}
            input={<OutlinedInput label="Sortby" />}
            // renderValue={(selected) => selected.join(', ')}
          >
            {sortby.map((sortby) => (
              <MenuItem key={sortby} value={sortby}>
                <ListItemText primary={sortby} />
              </MenuItem>
            ))}
            <FlexRow>
              <Button>Clear</Button>
              <Button>Apply</Button>
            </FlexRow>
          </Select>
        </FormControl>
      </FlexRow>
    </FlexCol>
  );
};

export default Header;
