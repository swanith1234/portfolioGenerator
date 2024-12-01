import Footer from "./sections/Footer";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import BuildYourBrand from "./sections/BuildYourBrand";
import Services from "./sections/Services";
import CustomerReviews from "./sections/CustomerReviews";
import Subscribe from "./sections/Subscribe";
import PortfolioForm from "./sections/portfolioForm";
import Themes from './sections/Themes'


import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <section className="xl:padding-l  wide:padding-r padding-b">
                  <Hero />
                </section>
                <section className="padding">
                  <BuildYourBrand />
                </section>
                <section className="padding-x">
                  <Services />
                </section>
                <section className="bg-blue-50 padding">
                  <CustomerReviews />
                </section>
                <section className="padding-x sm:py-32 py-16 w-full">
                  <Subscribe />
                </section>
                <section className="bg-black padding-x padding-t pb-8">
                  <Footer />
                </section>
              </>
            }
          />
          <Route path="/Portfolio-form" element={<PortfolioForm />} />
           <Route path="/Themes" element={<Themes/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
