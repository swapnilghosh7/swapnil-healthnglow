import axios from 'axios';
import react, {useEffect, useState} from 'react';

// Material UI Imports
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import FilterListIcon from '@material-ui/icons/FilterList';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//End Material UI Imports

import './ProductListing.css';
import ProductThumb from '../ProductThumb/ProductThumb.js';

function ProductListing() {
  // Define states
  const apiUrl = 'https://staging.healthandglow.com/api/catalog/product/v6/search/999?app=web&version=3.0.2&tag=loreal-paris';
  const [initialState, setInitialState] = useState({'data':[]});
  const [pageNo, setPageNo] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [newApiUrl, setnewApiUrl] = useState(apiUrl);
  const [paginationState, setPaginationState] = useState({'pagedata' : ''});
  const [isLoader,setLoader] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  let paginationCode = [];


// ------ modal open ---------
const handleOpen = () => {
  setFilterOpen(true);
};

const handleClose = () => {
  setFilterOpen(false);
};


//-------modal-close ------



  function getData(finalUrl,pageNum){
    setLoader(true);
    if(pageNum == 0)
    {
      axios.get( finalUrl + '&page='+pageNum+':20').then(function(response){
        let tempData = initialState.data;
        setInitialState({'data' : response.data.data.products } ) ;
        setTotalCount(response.data.data.totalCount);
      })
    }
    else if(pageNum*20 <= totalCount){
      axios.get(finalUrl + '&page='+pageNum+':20').then(function(response){
        let tempData = initialState.data;
        // setInitialState({'data' : tempData.concat(response.data.data.products) } ) ;
        setInitialState({'data' : response.data.data.products } ) ;
        setPageNo(pageNum);
        console.log('Set Page Num',pageNum);
      })
    }
    
  }

  function pagination(){
    console.log('inside');
    for(var i=0;i<Math.ceil(totalCount/20);i++)
    {
      paginationCode.push(i+1);
    }
    setPaginationState({'pagedata' : paginationCode});
    console.log();
  }
  

function loadPagination(e)
{
  console.log(e);
  document.querySelector(".pagination.active").classList.remove("active");
  e.target.classList.add("active");
  getData(apiUrl,(pageNo + 1));
  window.setTimeout(function(){
    setLoader(false);
  },200);
}


  


  // eventScrollHandling();

function handleSortChange(event){
      let finalApiUrl = apiUrl + '&sort=discount:' + event.target.value;
      setnewApiUrl(finalApiUrl);
      getData(finalApiUrl,0);
      window.setTimeout(function(){
        setLoader(false);
      },200);
      // console.log(event.target.value);
}

function filterSelect(e)
{
  e.target.classList.toggle("activeFilter");
  // console.log(event.target);
}

function submitFilter()
{
  var query = '';
  document.querySelectorAll(".filterListItem.activeFilter").forEach(function(data){
      query =  query + '&' + data.getAttribute("filter-item")
  });

  let finalApiUrl = apiUrl + query;
  setnewApiUrl(finalApiUrl);
  getData(finalApiUrl,0);
  handleClose();
  window.setTimeout(function(){
    setLoader(false);
  },200);
  
}


useEffect(() => {
  getData(apiUrl,0);
  window.setTimeout(function(){
    setLoader(false);
  },200);
  
}, [])
useEffect(()=>{
  pagination();
},[totalCount])

  return (
    <div className="productListing">
      {/* ------Loader Product ---------- */}
      {isLoader && 
      <div className="loaderWrapper">
        <CircularProgress className="loadingCircle" />
      </div>
      }
      {/* ---------Loader Product end --------- */}

      <div className="container">
        
        <div className="sortnfilter">

          {/* ----------Sorting Block Start------- */}
            <FormControl className="sortDropDown">
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleSortChange}
              >
                <MenuItem value="desc">Price (High to low)</MenuItem>
                <MenuItem value="asc">Price (Low to High)</MenuItem>
                {/* <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
            {/* ----------Sorting Block End------- */}

            {/* -----------Filter BLock Start --------- */}

            <button className="filterButton" onClick={handleOpen}>
              <FilterListIcon />
            </button>

            {/* -----------Filter BLock End --------- */}

        </div>
        <div className="productListingWrap">
          {initialState &&
          <ProductThumb productData={initialState} />
          }       
        </div>

        {/* ====Pagination Wrap ========= */}
        <div className="paginationWrap">
          <div className="paginationListWrap">
            {paginationState.pagedata && paginationState.pagedata.map(function(data){
              return(
              <span key={'pagination' + data} className={data==1? 'pagination active' : 'pagination'  } onClick={(e)=> loadPagination(e)}>{data}</span>
                );
            })

            }
          </div>
        </div>
      {/* =========Pagination Code end ======== */}
      {/*======Filter Modal ======  */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="modal"
          open={filterOpen}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={filterOpen}>
            <div className="fadeInPopper">
              <span className="filterCloseBtn" onClick={handleClose}>X</span>
              <h2 id="modal-title" className="modalHeader">Filter</h2>
              <p id="modal-description">Fliter List</p>
              <div className="filterListWrap">
                <div className="filterListItem" filter-item="shade=Maroon" onClick={(e)=> filterSelect(e)}>Shade</div>
                <div className="filterListItem" filter-item="category=lipstick" onClick={(e)=> filterSelect(e)}>Color</div>
              </div>

              <button className="submitBtnFilter" onClick={()=>submitFilter()}>Submit</button>
            </div>
          </Fade>
        </Modal>
{/*======Filter Modal ======  */}

      </div>
      
    </div>
  );
}

export default ProductListing;
