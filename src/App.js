import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./components/searchPage";
import WishListPage from "./components/wishListPage";
 
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="wishlist" element={<WishListPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
 
export default App;