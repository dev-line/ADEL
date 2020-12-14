import Axios from 'axios';
import { sign } from 'jsonwebtoken';
import { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { Loading, Oops, Seccess } from '../components/Alert';
import BOILERPLATE from '../components/BOILERPLATE'
import { ProductSchema } from '../services/data.spec';

export default function Carte(props:any) {
  const [Orders, setOrders] = useState<ProductSchema[]>([])
  const [SelectedProduct, setSelectedProduct] = useState<ProductSchema>()
  const [QN, setQN] = useState(1)
  const [Type, setType] = useState("SILVER")
  const Fname = useRef<HTMLInputElement>(null)
  const Lname = useRef<HTMLInputElement>(null)
  const Phone = useRef<HTMLInputElement>(null)
  const [Gender,setGender] = useState("ذكر")
  const Wilaya = useRef<HTMLInputElement>(null)
  const Baladya = useRef<HTMLInputElement>(null)
  const Router = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined") {
      const OrdersStr = localStorage.getItem("ORDERS")
      const List = JSON.parse(OrdersStr!)||[]
      setOrders(List);
      if (List.length==0) {
        Router.push("/")
      }
    }
  }, [])
  useEffect(() => {
    $(".menu").remove()
    $(".menu2").show()
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });

  }, [])
  const Total = () => {
    var total = 0;
    Orders.map((res) => (total += res.total!));
    return total;
  };
  const SelectProduct = (Order: ProductSchema)=>{
    setQN(Number(Order.qn))
    setType(Order.type!)
    setSelectedProduct(Order)
  }
  const EditOrder = (Order: ProductSchema) => {
        var data: ProductSchema[] = Orders
        const IsInCart = data.findIndex(
          (itm) => itm.id == Order.id && itm.type == Order.type
        );
        if (IsInCart >= 0) {
          const NewList = data.map((itm) => {
            if (itm.id == Order.id && itm.type == Order.type) {
              itm.qn! = QN;
              itm.type = Type
              itm.total! =
                (Type == "SILVER"
                  ? itm.price_silver
                  : itm.price_blacquer) * itm.qn!;
              return itm;
            } else {
              return itm;
            }
          });
          setOrders([...NewList]);
        }
  };
  const RenderList = ()=>{
    return Orders.map((res,key)=>(
      <div className="media" key={key}>
                  <div className="carte-prod-thumb bg-cover ml-2" style={{ background: `url(${res.image?res.image!:"assets/img/items/01.jpg"})` }}></div>
                  <div className="media-body my-auto">
                    <div className="row justify-content-between">
                      <div className="col-7 cursor-pointer" data-toggle="modal" data-target="#productInfo" onClick={()=>{SelectProduct(res)}}>
                        <div className="cart-prod-name d-block text-dark opacity-80 font-weight-semi-bold">{res.name}</div>
                        <small className="d-block text-body">
    <span className="mul">{res.qn}</span>
                          <span className="currency-sm">{res.type=="SILVER"?res.price_silver:res.price_blacquer}</span>
                        </small>
                      </div>
                      <div className="col-5 text-left text-body my-auto">
                        <span className="font-size-1 currency-sm">{res.total}</span>
                        <button type="button" className="btn p-0 small text-muted"><i className="far fa-times" onClick={()=>{RemoveOrder(res)}}></i></button>
                      </div>
                    </div>
                  </div>
                </div>
    ))
  }
  const RemoveOrder = (Order: ProductSchema) => {
    setOrders(Orders.filter(itm=>itm!=Order));
    localStorage.setItem("ORDERS", JSON.stringify(Orders.filter(itm=>itm!=Order)))
    if (Orders.length == 0) {
      Router.push("/")
    }
  };
  const Submit = async(E:any)=>{
    E.preventDefault()
    Loading()
    const jwt = JSON.stringify(Orders)
    const Order = {
      name:       `${Fname.current?.value} ${Lname.current?.value}`,
      phone :     Number(Phone.current?.value),
      address:    `${Wilaya.current?.value} - ${Baladya.current?.value}`,
      gender   :  Gender,
      Products :  jwt
    }
    await Axios.post("/api/orders",Order).then(res=>{
      Seccess()
      localStorage.removeItem("ORDERS")
      E.target.reset()
    }).catch(err=>{
      Oops()
    })
  }
  return (
    <BOILERPLATE {...{Orders:Orders,RemoveOrder: RemoveOrder, Title:"سلة المشتريات"}}>
            <NextSeo
      title={`${props.title} | قائمة المشتريات`}
      description="A short description goes here."
    />
      <div className="container toggled spacer-80 spacer-md-100" id="wrapper">
        <div className="row">
          <div className="col-12 col-lg-4 z-index-1050 px-2 toggled" id="dash-nav">
            <div className="card h-100 rounded-lg border-0 shadow-sm">
              <div className="card-header">
                <h5 className="my-auto">سلة المشتريات</h5>
              </div>
              <div className="card-body">

                
                {RenderList()}



              </div>
              <div className="card-footer currency-xs">
                {Total()}
                        </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="card rounded-lg border-0 shadow-sm">
              <div className="card-body">


                <div className="border-bottom py-2">
                  <h6 className="text-cap text-dark-f opacity-80 font-weight-semi-bold">
                    معلومات أساسية
                                </h6>
                </div>
                <form className="needs-validation mt-10 px-5" onSubmit={Submit} > 

                  <div className="form-row">
                    <div className="col-md-6 mb-5">
                      <label className="font-size-1" htmlFor="firstName">الإسم</label>
                      <input type="text" className="form-control form-control-sm" id="firstName" placeholder="الإسم" required ref={Fname} />
                      <div className="invalid-feedback">
                        رجاءا قم يإدخال اسمك
                                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="font-size-1" htmlFor="lastName">اللقب</label>
                      <input type="text" className="form-control form-control-sm" id="lastName" placeholder="اللقب" required ref={Lname} />
                      <div className="invalid-feedback">
                        رجاءا قم يإدخال لقبك
                                        </div>
                    </div>
                  </div>
                  <div className="form-row mb-5">
                    <div className="col">
                      <label className="font-size-1" htmlFor="unumber">رقم الهاتف</label>
                      <input type="number" className="form-control form-control-sm" id="unumber" placeholder="0123456789" required ref={Phone} />
                      <div className="invalid-feedback">
                        رجاءا قم يإدخال رقم هاتفك
                                        </div>
                    </div>
                  </div>
                  <div className="form-row mb-5">
                    <label className="font-size-1" htmlFor="genderType">الجنس</label>
                    <div className="input-group input-group-md-down-break">
                      {/* <!-- Custom Radio --> */}
                      <div className="form-control form-control-sm rounded-0">
                        <div className="position-absolute h-100 w-100 top-0 left-0 btn text-right">
                          <label className="w-100 h-100 btn position-absolute top-0 left-0 z-index-2" htmlFor="male"></label>
                          <div className="custom-control custom-radio mt-n1">
                            <input type="radio" className="custom-control-input z-index-1" name="genderTypeRadio" onChange={(e)=>(e.target.checked?setGender("ذكر"):setGender("أنثى"))} id="male" checked={Gender == "ذكر"?true:false} />
                            <label className="custom-control-label text-body font-size-1 font-weight-normal" htmlFor="male">ذكر</label>
                          </div>
                        </div>
                      </div>
                      {/* <!-- End Custom Radio --> */}

                      {/* <!-- Custom Radio --> */}
                      <div className="form-control form-control-sm rounded-0">
                        <div className="position-absolute h-100 w-100 top-0 left-0 btn text-right">
                          <label className="w-100 h-100 btn position-absolute top-0 left-0 z-index-2" htmlFor="female"></label>
                          <div className="custom-control custom-radio mt-n1">
                            <input type="radio" className="custom-control-input z-index-1" name="genderTypeRadio" id="female" onChange={(e)=>(!e.target.checked?setGender("ذكر"):setGender("أنثى"))} checked={Gender == "ذكر"?false:true} />
                            <label className="custom-control-label text-body font-size-1 font-weight-normal" htmlFor="female">أنثى</label>
                          </div>
                        </div>
                      </div>
                      {/* <!-- End Custom Radio --> */}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-md-6 mb-5">
                      <label className="font-size-1" htmlFor="wilaya">الولاية</label>
                      <input type="text" className="form-control form-control-sm" id="wilaya" placeholder="الولاية" required ref={Wilaya} />
                      <div className="invalid-feedback">
                        أختر الولاية
                                        </div>
                    </div>
                    <div className="col-md-6 mb-5">
                      <label className="font-size-1" htmlFor="communes">البلدية / الدائرة</label>
                      <input type="text" className="form-control form-control-sm" id="communes" placeholder="البلدية / الدائرة" required ref={Baladya} />
                      <div className="invalid-feedback">
                        أختر البلدية / الدائرة
                                        </div>
                    </div>
                  </div>

                  <div>
                    <button type="submit" className="btn btn-sm btn-wide btn-outline-primary mr-2">
                      اطلب الان
                                    </button>
                  </div>
                </form>


              </div>
            </div>
          </div>
        </div>
      </div>


      
      <div
        className="modal fade"
        id="productInfo"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable px-5 px-lg-10"
          role="document"
        >
          <div className="modal-content border-0">
            <div className="modal-top-cover bg-primary text-center">
              <figure className="position-absolute right-0 bottom-0 left-0">
                <svg
                  className="mb-n2"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1920 100.1"
                >
                  <path
                    fill="#fff"
                    d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                  />
                </svg>
              </figure>

              <div className="close">
                <button
                  type="button"
                  className="btn btn-sm text-white"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="modal-top-cover-avatar text-center">
              <img
                className="u-lg-avatar rounded-circle bg-white shadow-soft"
                src={SelectedProduct?.image}
                alt="Logo"
              />
            </div>

            <div className="modal-body pt-3 pb-0">
              <div className="text-center my-3">
                <h5 className="mb-1">{SelectedProduct?.name!}</h5>
                <span className="h6 font-weight-semi-bold currency-xs">
                  {Type == "SILVER"
                    ? SelectedProduct?.price_silver!
                    : SelectedProduct?.price_blacquer!}
                </span>
              </div>
              <div className="card border-0">
                <div className="card-body">
                  <p className="mb-1 small font-weight-semi-bold">النوع:</p>
                  <div className="small mb-2">
                    <select
                      className="custom-select custom-select-sm"
                      onChange={(e)=>{setType(e.currentTarget.value)}}
                    >
                      <option value="SILVER" selected={SelectedProduct?.type == "SILVER"?true:false}>
                        فضة
                      </option>
                      <option value="PLACQUER" selected={SelectedProduct?.type == "SILVER"?false:true}>بلاكيور</option>
                    </select>
                  </div>
                  <p className="mb-1 small font-weight-semi-bold">الكمية:</p>
                  <div className="small mb-5">
                    <select
                      className="custom-select custom-select-sm"
                      defaultValue={SelectedProduct?.qn}
                      onChange={(e) => {
                        setQN(Number(e.target.value));
                      }}
                    >
                      <option value={1} selected
                      >
                        01
                      </option>
                      <option value={2}>02</option>
                      <option value={3}>03</option>
                      <option value={4}>04</option>
                      <option value={5}>05</option>
                      <option value={6}>06</option>
                      <option value={7}>07</option>
                      <option value={8}>08</option>
                      <option value={9}>09</option>
                      <option value={10}>10</option>
                    </select>
                  </div>
                  <div>
                    <button
                      onClick={()=>{EditOrder(SelectedProduct!)}}
                      type="button"
                      className="btn btn-sm btn-block btn-soft-primary"
                    >
                      أضف إلى سلة المشتريات
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BOILERPLATE>
  )
}

export const getServerSideProps = async (ctx:NextPageContext) => {
  return {
      props:{
          title: process.env.WEBSITENAME
      }
  }
}