import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout__body">
        <Nav />
        <Main>
          <Outlet />
        </Main>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;