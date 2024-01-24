import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageDetails from '../pages/PageDetails';
import PageFavorites from '../pages/PageFavorites';
import PageWatchList from '../pages/PageWatchList';
// import PageNotFound from '../pages/PageNotFound';

function AppRouter() {
  return (
    <Router>
      <div className="wrapper">
        <HeaderNav />
        <main>
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/movie/:id" exact element={<PageDetails />} />
            <Route path="/favorites" element={<PageFavorites />} />
            <Route path="/watchlist" element={<PageWatchList />}/>
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default AppRouter;
