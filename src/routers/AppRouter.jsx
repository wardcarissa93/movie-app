import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HeaderNav from '../components/HeaderNav';
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageDetails from '../pages/PageDetails';
import PageFavorites from '../pages/PageFavorites';
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
            <Route path="/:id" exact element={<PageDetails />} />
            <Route path="/favorites" element={<PageFavorites />} />
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default AppRouter;
