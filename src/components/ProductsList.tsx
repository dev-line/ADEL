import React from 'react'
import { ProductSchema } from '../services/data.spec'
import Link from "next/link"

export default function ProductsList(props:{product:ProductSchema, Delete:any}) {
  const {product, Delete} = props
  const createdAt = new Date(product?.createdAt!)
  return (
    <tr>
      <td className="text-lh-md">

        <div className="media">
          <img src={product.image?product.image!:"/assets/img/empty.png"} className="u-avatar rounded ml-3" alt="..." />
          <div className="media-body">
            <p className="font-size-1 font-weight-semi-bold mb-0">{product.name}</p>
            <ul className="list-unstyled d-flex mb-0">
              <li>
               <Link href={`/dashboard/admin/products/edit/${product.id}`}>
               <a className="btn text-primary-f p-0 smaller font-weight-bold">
                  تعديل
                                                    </a>
               </Link>
              </li>

              <li>
                <button type="button" className="btn text-danger-f p-0 smaller font-weight-bold" data-toggle="modal" data-target={`#delPost${product.id}`}>                  حذف
                                                    </button>
              </li>

            </ul>
          </div>
        </div>



      </td>
      <td><p className="font-size-1 font-weight-semi-bold mb-0 currency-sm">{product.price_silver}</p></td>
      <td><p className="font-size-1 font-weight-semi-bold mb-0 currency-sm">{product.price_blacquer}</p></td>
  <td><p className="font-size-1 font-weight-semi-bold mb-0">{product.categories![0].name}</p></td>
      <td><p className="font-size-1 font-weight-semi-bold mb-0">{`${createdAt.getFullYear()}/${createdAt.getMonth()+1}/${createdAt.getDate()}`}</p></td>
      {/* <!-- Delete Post --> */}
      <div className="modal fade" id={`delPost${product.id}`} tabIndex={-1} role="dialog" aria-labelledby="delPost" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">

            <div className="modal-body px-3">
              <div className="pt-5 text-center">
                <i className="fal fa-3x fa-trash-alt text-danger-f"></i>
                <h4 className="font-weight-bold mt-5 mb-3">حذف المنتج</h4>
                <p className="font-weight-semi-bold mb-0">هل أنت متأكد أنك تريد حذف هذا المنتج ؟</p>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-sm text-muted font-weight-semi-bold" data-dismiss="modal">إلغاء</button>
              <button type="button" className="btn btn-sm btn-danger-f text-white font-weight-semi-bold" onClick={()=>{Delete(product.id)}}>حذف</button>
            </div>
          </div>
        </div>
      </div>
    </tr>
  )
}
