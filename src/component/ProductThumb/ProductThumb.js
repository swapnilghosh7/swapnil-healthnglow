import react, {useEffect, useState} from 'react';
import './ProductThumb.css';

function ProductThumb(props) {
  // Define states
  function processData()
  {
    console.log(props.productData.data);
  }
  
  useEffect(() => {
    processData();
  }, [props])
  
  return (
    <div className="productThumbWrap">

      {props.productData.data && 
        props.productData.data.map(function(productDataThumb,key){
          return(
            <a href={productDataThumb.deepLinkUrl} className="thumbUrlWrap">
              <div key={key} className="productThumb">
                {productDataThumb.skuPromoText &&
                  <span className="specialPriceTag">{productDataThumb.skuPromoText}</span>
                }
                <div className="productImageWrap">
                  <img src={productDataThumb.skuImageUrl} alt="" className="imageUrl"/>
                </div>
                <div className="priceBoxWrap">
                  <span className="priceBox">&#x20B9; {productDataThumb.defaultPrice}</span>
                </div>
                <div className="productDetailsWrap">
                  <h5 className="productName">
                  {productDataThumb.skuName}
                    </h5> 
                </div>
                
              </div>
            </a>

          )
          
        })

      }
    </div>
  );
}

export default ProductThumb;
