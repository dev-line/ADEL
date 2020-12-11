import Axios from "axios";
import { NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import { Loading, Oops, Seccess } from "../../../components/Alert";
import BOILERPLATE from "../../../components/BOILERPLATE";
import DASBOILERPLATE from "../../../components/DASBOILERPLATE";
import OrdersList from "../../../components/OrdersList";
import { OrdersSchema, ProductSchema } from "../../../services/data.spec";

export default function orders(props:{data:OrdersSchema[]}) {
  const [Orders, setOrders] = useState<OrdersSchema[]>(props.data)
  const [SelectedOrder, setSelectedOrder] = useState<OrdersSchema>()
  const [SelectedOrderList, setSelectedOrderList] = useState<ProductSchema[]>([])
  const [Total, setTotal] = useState(0)
  const SelectOrder = (Order:OrdersSchema,total:number)=>{
    setSelectedOrder(Order)
    setTotal(total)
  }
  useEffect(() => {
    try {
      setSelectedOrderList(JSON.parse(SelectedOrder?.Products!) || [])
    } catch (error) {
      
    }
  }, [SelectedOrder])
  const RemoveOrder = async(id:number)=>{
    $(`#delPost${id}`).hide()
    $(".modal-backdrop").remove()
    Loading()
    await Axios.delete(`/api/orders/${id}`).then(res=>{
      const List = Orders.filter(itm=>itm.id!==res.data.id)
      setOrders(List)
      Seccess()
    }).catch(err=>{
      Oops()
    })
  }
  function RenderList() {
    return Orders.map(res=>(
      <OrdersList key={res.id} data={res} Select={SelectOrder} Remove={RemoveOrder} />
    ))
  }
  const RenderOrderProduct =()=>{
    return SelectedOrderList.map((res,key)=>(
      <li className="list-group-item" key={key}>
      <div className="media">
<div className="u-avatar bg-cover ml-2" style={{background: `url("${res.image}")`}}></div>
<div className="media-body d-flex justify-content-between align-items-center my-auto">
    <span className="text-dark opacity-80">{res.name}</span>
    <span className="text-dark opacity-80">{res.qn}</span>
<span className="currency-sm">{res.total}</span>
</div>
</div>
      </li>
    ))
  }

  return (
    <DASBOILERPLATE title="الطلبات">
      <div className="col-lg-10">
        <div className="container spacer-70">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">الزبون</th>
                  <th scope="col">المبلغ الإجمالي</th>
                  <th scope="col">الولاية</th>
                  <th scope="col">بتاريخ</th>
                </tr>
              </thead>
              <tbody>
                {RenderList()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      

      {/* <!-- Client Order --> */}
      {/* <!-- <div className="modal fade" id="cOrder" tabIndex={1} aria-labelledby="cOrderLabel" aria-hidden="true"> */}
      {/* <div className="modal-dialog modal-dialog-centered modal-lg"> */}
      {/* <div className="modal-content"> */}
      {/* <div className="modal-header"> */}
      {/* <h5 className="modal-title" id="cOrderLabel">الطلب رقم: <span>255</span></h5> */}
      {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close"> */}
      {/* <span aria-hidden="true">&times;</span> */}
      {/* </button> */}
      {/* </div> */}
      {/* <div className="modal-body"> */}
      {/* <ul className="list-unstyled"> */}
      {/* <li className="mb-3"><p className="text-dark font-weight-semi-bold mb-0">الإسم: <span id="name">سمير</span></p></li> */}
      {/* <li className="mb-3"><p className="text-dark font-weight-semi-bold mb-0">اللقب: <span id="fname">بوزاهر</span></p></li> */}
      {/* <li className="mb-3"><p className="text-dark font-weight-semi-bold mb-0">رقم الهاتف: <span id="phone">0664829721</span></p></li> */}
      {/* <li className="mb-3"><p className="text-dark font-weight-semi-bold mb-0">الجنس: <span id="sex">ذكر</span></p></li> */}
      {/* <li className="mb-3"><p className="text-dark font-weight-semi-bold mb-0">الولاية: <span id="phone">باتنة</span></p></li> */}
      {/* <li className="mb-3"><p className="text-dark font-weight-semi-bold mb-0">البلدية / الدائرة: <span id="sex">عين التوتة</span></p></li> */}
      {/* <li className="mb-3"><p className="text-dark font-weight-semi-bold mb-0">العنوان: <span id="address">شارع صالح لعلى</span></p></li> */}
      {/* <li className="d-flex"> */}
      {/* <p className="text-dark font-weight-semi-bold mb-0">حالة الطلب: */}
      {/* <div className="form-group mr-2"> */}
      {/* <select className="form-control form-control-xs border-0s" id="orderstatus"> */}
      {/* <option>قيد الإنتظار</option> */}
      {/* <option>مؤكد</option> */}
      {/* <option>تم التسليم</option> */}
      {/* </select> */}
      {/* </div> */}
      {/* </li> */}
      {/* </ul> */}
      {/* </div> */}
      {/* <div className="modal-footer"> */}
      {/* <button type="button" className="btn btn-sm font-weight-semi-bold ml-2" data-dismiss="modal">غلق</button> */}
      {/* <button type="button" className="btn btn-sm btn-success-f font-weight-semi-bold text-white">تأكيد</button> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> --> */}

      {/* <!-- Invoice Modal --> */}
      <div
        className="modal fade"
        id="cOrder"
        tabIndex={1}
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content border-0">
            {/* <!-- Header --> */}
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
                className="u-lg-avatar rounded-circle shadow-soft"
                src="assets/img/icons/favorites_shield.svg"
                alt="Logo"
              />
            </div>

            <div className="container">
              <div className="text-center mb-5">
                <h5 className="mb-1">Invoice from Shopper</h5>
  <span className="d-block text-muted mt-2">Invoice #{SelectedOrder?.id}</span>
              </div>

              <div className="row mb-5">
                <div className="col-md-4 mb-3 mb-md-0">
                  <p className="font-weight-semi-bold text-dark mb-1">
                    المبلغ الإجمالي:
                  </p>
                  <span className="small text-dark currency-sm">{Total}</span>
                </div>

                <div className="col-md-4 mb-3 mb-md-0">
                  <p className="font-weight-semi-bold text-dark mb-1">
                    تاريخ الطلب:
                  </p>
                  <span className="small text-dark">{SelectedOrder?.createdAt}</span>
                </div>

                <div className="col-md-4 mb-3 mb-md-0">
                  <p className="font-weight-semi-bold text-dark mb-1">
                    الزبون:
                  </p>
                  <span className="small text-dark">{SelectedOrder?.name}</span>
                </div>
              </div>

              <small className="text-cap">المنتجات</small>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body pt-3">
              <ul className="list-group vh-25 overflowY-auto">
    {RenderOrderProduct()}
              </ul>
            </div>
            {/* <!-- End Body --> */}
            <div className="container py-3">
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-xs btn-outline-secondary border"
                >
                  <i className="fas fa-print ml-1"></i>Print Invoice
                </button>
                <button
                  type="button"
                  className="btn btn-xs btn-outline-secondary border mx-2"
                >
                  <i className="fas fa-file-download ml-1"></i>PDF
                </button>
                <button
                  type="button"
                  className="btn btn-xs btn-outline-secondary border"
                >
                  <i className="fas fa-save ml-1"></i>Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DASBOILERPLATE>
  );
}

export const getServerSideProps = async (ctx:NextPageContext) => {
  var OrdersList:OrdersSchema[] = []
  await Axios.get("http://localhost:3000/api/orders").then(res=>{
    OrdersList = res.data
  }).catch(err=>{
    console.log(err);
  })
  return {
      props:{
          data:OrdersList
      }
  }
}