import React, { FunctionComponent, useEffect, useState } from "react";
import HEAD from "next/head";
import Link from "next/link"
import { InfoSchema, ProductSchema } from "../services/data.spec";
import ProductInCarte from "./ProductInCarte";
import { NextPageContext } from "next";
import Axios from "axios";
import { useRouter } from "next/router";
import { Loading } from "./Alert";


const BOILERPLATE = (props: any,info:{data:InfoSchema}) => {
  const router = useRouter()
  const [Info, setInfo] = useState<InfoSchema>({})
  const [Path, setPath] = useState("load")
  const Orders: ProductSchema[] = props.Orders || [];
  const RemoveOrder: Function = props.RemoveOrder;
  const SelectProduct: Function = props.SelectProduct;
  useEffect(() => {
    $(".modal-backdrop").remove()
    $("body").css("overflow", "auto")
    if (typeof window !== "undefined") {
      setPath(location.pathname)
    }
    Axios.get("/api/info").then(res=>{
      setInfo(res.data)
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      console.log(Info);
    })
  }, [])
  useEffect(() => {
    if (Path!=="load"&&Path !=="/carte") {
      $(".menu2").remove()
    }
  }, [Path])
  const Title: String = props.Title
  const Total = () => {
    var total = 0;
    Orders.map((res) => (total += res.total!));
    return total;
  };
  const GetOrders = () => {
    return Orders.map((res, key) => (
      <ProductInCarte key={key} data={res} Remove={RemoveOrder}/>
    ));
  };
  return (
    <React.Fragment>
      <HEAD>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <script src="/assets/js/jquery.min.js"></script>
      </HEAD>
      <main className="overflow-hidden" dir="rtl">
        <nav className="navbar spacer-15 fixed-top navbar-light bg-light">
          <div className="container">
            <div className="ml-auto">
              <Link href="/">
              <a className="navbar-brand">
                <img src="/assets/img/Logo.png" className="img-fluid" width={55} height={50} alt="مجوهرات تاج العروس" />
              </a>
              </Link>
            </div>
            <div className="d-flex my-auto menu2">
                <button className="btn btn-sm btn-icon btn-soft-secondary rounded-circle d-flex d-lg-none" id="menu-toggle" type="button">
                        <i className="fas fa-shopping-basket"></i>  
                        <span className="badge badge-danger rounded-circle position-absolute mt-n2 left-0">{Orders.length}</span>                      
                    </button>
               
            </div>
            <div className="d-flex my-auto">
              <div className="dropdown menu">
                <button
                  className="btn btn-sm btn-icon btn-soft-secondary rounded-circle"
                  type="button"
                  id="shoppingCartDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-shopping-basket"></i>
                  <span className="badge badge-danger rounded-circle position-absolute mt-n2 left-0">
                    {Orders.length}
                  </span>
                </button>
                <div
                  className="dropdown-menu dropdown-cart text-center mt-4 pt-2 pb-0"
                  aria-labelledby="shoppingCartDropdown"
                >
                  {Orders.length>0?GetOrders():<img className="img-fluid w-40" src="/assets/img/icons/svg/empty-cart.svg"/>}
                  <div className="container py-3 d-flex justify-content-between bgd-content">
                    <p className="font-weight-semi-bold mb-0">
                      السعر الإجمالي:
                    </p>
                    <p className="currency-sm font-weight-bold mb-0">
                      {Total()}
                    </p>
                  </div>
                  {Orders.length>0?<Link href={{pathname:"/carte"}}>
                  <a
                    className="btn btn-sm btn-block btn-soft-primary rounded-0"
                  >
                    عرض سلة المشتريات
                    <i className="fas fa-shopping-bag mr-2"></i>
                  </a>
                  </Link>:""}
                  {/* <!-- <div className="my-5">
                            <img src="assets/img/icons/svg/empty-cart.svg" className="u-lg-avatar" alt="Empty Cart">
                            <h6 className="mt-2">سلة مشترياتك فارغة</h6>
                            <p className="small mb-0"></p>
                        </div> --> */}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-icon btn-soft-secondary rounded-circle mr-4"
                data-toggle="modal"
                data-target="#mainMenu"
              >
                <i className="far fa-grip-lines"></i>
              </button>
            </div>
          </div>
        </nav>
        {props.children}
        {/* <!-- Main Menu --> */}
        <div
          className="modal fade"
          id="mainMenu"
          tabIndex={-1}
          aria-labelledby="mainMenuLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content bg-dark opacity-80s">
              <div className="modal-header border-0">
                <button
                  type="button"
                  className="close btn rounded-circle m-1 mt-lg-0"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa fa-times text-white"></i>
                </button>
              </div>
              <div className="modal-body vh-75 d-flex align-items-center">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-8 mb-10 mb-lg-0">
                      <ul className="list-unstyled">
                        <li className="mb-4 mb-lg-8">
                       <Link href="/">
                       <a
                            className="font-size-3 text-white"
                          >
                            الرئيسية
                          </a>
                       </Link>
                        </li>
                        <li className="mb-4 mb-lg-8">
                          <Link href="/about">
                          <a
                            className="font-size-3 text-white"
                          >
                            من نحن
                          </a>
                          </Link>
                        </li>
                        <li className="mb-4 mb-lg-8">
                          <Link href="/contact">
                          <a
                            className="font-size-3 text-white"
                          >
                            تواصل معنا
                          </a></Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-lg-4 text-white my-auto">
                      <div className="mb-7">
                        <span className="d-block text-white font-weight-bold mb-3">
                          إتصل بنا
                        </span>
                        <address className="mb-0">
                          <span className="text-white d-block text-white-70 mb-2">
                            {Info.phone}
                          </span>
                          <span className="text-white d-block text-white-70 mb-2">
                            {Info.email}
                          </span>
                          <span className="text-white d-block text-white-70">
                            {Info.address}
                          </span>
                        </address>
                      </div>
                      <span className="d-block text-white font-weight-bold mb-3">
                        التواصل الاجتماعي
                      </span>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item ml-3">
                          <a
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            target="_blanck"
                            href={Info.facebook}
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            target="_blanck"
                            href={Info.Instagram}
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <script src="assets/js/jquery.min.js"></script>
      <script src="/assets/js/popper.min.js"></script>
      <script src="/assets/js/bootstrap.min.js"></script>
      <script src="/assets/js/swiper.min.js"></script>
      <script src="/assets/js/app.js"></script>
    </React.Fragment>
  );
};
export default BOILERPLATE;

