
import AdBanner from '../Components/Bannershow'
import { useContext } from 'react'
import { AppContext } from '../Components/UseContext'
import Allusers from '../Components/allusers'
import ProductCategories from '../Components/ProductCategories'


function Catagory() {
    const {categoryName}=useContext(AppContext)
    switch (categoryName) {

      case "ad":
        return <AdBanner />
      
      case "allusers":
        return <Allusers />;
        case "allproducts":
          return <ProductCategories/>

      default:
        return <p>Select a category from the Home page</p>;
    }
  }
    
export default Catagory