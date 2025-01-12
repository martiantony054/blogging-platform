import { Route, Routes } from "react-router-dom";
import "./App.css";
import Addpost from "./Components/Addpost";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Blogs from "./Components/Blogs";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Addpost />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
