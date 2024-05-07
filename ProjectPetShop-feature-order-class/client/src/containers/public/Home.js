import React from "react";
import {
  Course,
  Introduce,
  Items,
  Knowledge,
  RegisterBottom,
} from "../../components";
import { UseSelector, useSelector } from "react-redux";
// import {getProducts} from '../../apis/home'

const Home = () => {
  const {isLoggedIn, current} = useSelector(state => state.user)

  
  // useEffect(() => {
  //   const fetchDataHome = async () => {
  //     const response = await apis.getHome();
  //     console.log(response);
  //   };
  //   fetchDataHome();
  // }, []);

  // const { products } = useSelector((state) => state.app);

  return (
    <>
      <Introduce />
      <Items />
      <Course />
      <Knowledge />
      <RegisterBottom />
    </>
  );
};

export default Home;
