import { Route, Routes } from "react-router-dom";
import HomePage from "./Home/Home";
import AddPage from "./Add/Add";
import EditPage from "./Edit/Edit";
import { Header, SiteBar } from "../components";
const Router = () => {
  return (
    <>
      <Header />
      <div className="wrapper_admin">
        <SiteBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add/product" element={<AddPage />} />
          <Route path="/edit/product/:id" element={<EditPage />} />
        </Routes>
      </div>
    </>
  );
};

export default Router;
