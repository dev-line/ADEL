import Axios from 'axios'
import { decode, verify } from 'jsonwebtoken'
import React, { useEffect, useState } from 'react'
import { OrdersSchema, ProductSchema } from '../services/data.spec'

function OrdersList(props:{data:OrdersSchema,Select:Function,Remove:Function}) {    
  const {data,Remove}=props
  const {Products} = data


  const CalcTotal = ()=>{
    const List:ProductSchema[] = JSON.parse(Products!) || []
    var total = 0
    List.map(res=>{
      total+=res.total!
    })
    return total
  }
  const RemoveOrder = ()=>{
    Remove(data.id)
  }
  const [Total, setTotal] = useState(CalcTotal())
    return (
        <tr>
        <td className="text-lh-md">
          <div className="media">
            {/* <!-- <img src="assets/img/08.jpg" className="u-avatar rounded ml-3" alt="product-pic"> --> */}
            <div className="media-body">
              <p className="font-size-2 text-dark font-weight-semi-bold mb-0">
                {data.name}
              </p>
              <ul className="list-unstyled d-flex mb-0">
                <li>
                  <button
                    type="button"
                    className="btn text-primary-f p-0 smaller font-weight-bold"
                    data-toggle="modal"
                    data-target="#cOrder"
                    onClick={()=>{props.Select(data,Total)}}
                  >
                    عرض
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="btn text-danger-f p-0 smaller font-weight-bold mx-3"
                    data-toggle="modal"
                    data-target={`#delPost${data.id}`}
                  >
                    حذف
                  </button>
                </li>
                <li>
                  <div className="btn text-success p-0 smaller font-weight-bold">
                    حالة الطلب:{" "}
                    <span id="ordStatus" className="text-dark">
                      قيد الإنتظار
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </td>
        <td>
          <p className="font-size-1 font-weight-semi-bold mb-0 currency-sm">
            {Total}
          </p>
        </td>
        <td>
          <p className="font-size-1 font-weight-semi-bold mb-0">
            {data.address}
          </p>
        </td>
        <td>
          <p className="font-size-1 font-weight-semi-bold mb-0">
            {data.createdAt}
          </p>
        </td>
        {/* <!-- Delete Post --> */}
      <div
        className="modal fade"
        id={`delPost${data.id}`}
        tabIndex={1}
        role="dialog"
        aria-labelledby="delPost"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body px-3">
              <div className="pt-5 text-center">
                <i className="fal fa-3x fa-trash-alt text-danger-f"></i>
                <h4 className="font-weight-bold mt-5 mb-3">حذف الطلب</h4>
                <p className="font-weight-semi-bold mb-0">
                  هل أنت متأكد أنك تريد حذف هذا الطلب ؟
                </p>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-sm text-muted font-weight-semi-bold"
                data-dismiss="modal"
              >
                إلغاء
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger-f text-white font-weight-semi-bold"
                onClick={()=>{RemoveOrder()}}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
      </tr>
    )
}

export default OrdersList
