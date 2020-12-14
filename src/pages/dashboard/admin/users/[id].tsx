import Axios from "axios";
import { NextPageContext } from "next";
import React, { useEffect, useRef, useState } from "react";
import { Loading, Oops, Seccess } from "../../../../components/Alert";
import DASBOILERPLATE from "../../../../components/DASBOILERPLATE";
import { UserSchema } from "../../../../services/data.spec";

export default function editProfile(props:{User:UserSchema}) {
  const {User} = props
  const Name = useRef<HTMLInputElement>(null)
  const UserName = useRef<HTMLInputElement>(null)
  const Email = useRef<HTMLInputElement>(null)
  const oPass = useRef<HTMLInputElement>(null)
  const nPass = useRef<HTMLInputElement>(null)
  const cPass = useRef<HTMLInputElement>(null)

  const EditUser=async(e:any)=>{
    e.preventDefault()
    const Data:UserSchema = {
      id: User.id,
      email: Email.current?.value!,
      name: Name.current?.value!,
      username: UserName.current?.value!
    }
    Loading()
    await Axios.put(`/api/auth/profile`,Data).then(res=>{
      Seccess()
    }).catch(err=>{
      Oops()
    })
  }
  const EditPassword = async(e:any)=>{
    e.preventDefault()
    if (nPass.current?.value == cPass.current?.value) {
      const PasswordData = {
        id: User.id,
        OldPass: oPass.current?.value,
        password: nPass.current?.value
      }
      Loading()
      await Axios.put("/api/auth/profile",PasswordData).then(res=>{
        Seccess()
      }).catch(err=>{
        Oops()
      })
    }
  }
  return (
    <DASBOILERPLATE title="الملف الشخصي">
      <div className="col-lg-10">
        <form onSubmit={EditUser}>
          <div className="container spacer-70">
            <div className="row justify-content-aroudnd">
              {/* <!--  --> */}
              <div className="col-12 col-lg-10 mt-5 mt-lg-0 order-1 order-lg-0">
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- Name Input --> */}
                    <div className="form-group">
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputname"
                      >
                        الإسم واللقب
                      </label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fal fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm text-muted"
                          id="inputname"
                          placeholder="John Deo"
                          ref={Name}
                          defaultValue={User.name}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- UserName Input --> */}
                    <div className="form-group">
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputUsername"
                      >
                        اسم المستخدم
                      </label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fal fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm text-muted"
                          id="inputUsername"
                          placeholder="John Deo"
                          ref={UserName}
                          defaultValue={User.username}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- Email Input --> */}
                    <div className="form-group">
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputEmail"
                      >
                        البريد الإلكتروني
                      </label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fal fa-envelope"></i>
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control form-control-sm text-muted"
                          id="inputEmail"
                          placeholder="name@example.com"
                          ref={Email}
                          defaultValue={User.email}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- Password Input --> */}
                    <div className="form-group">
                      <div className="d-flex mt-1">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold my-auto pl-1"
                          htmlFor="inputPassword"
                        >
                          كلمة السر
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm p-0 text-primary-f font-weight-semi-bold"
                          data-toggle="modal"
                          data-target="#editPassword"
                        >
                          ( تغيير )
                        </button>
                      </div>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fal fa-key"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control form-control-sm text-muted bg-white"
                          id="inputPassword"
                          placeholder="********"
                          data-toggle="password"
                          disabled
                        />
                      </div>
                      <span className="smaller text-muted">
                        من الجيد استخدام كلمة سر قوية لا تستخدمها في أي مكان آخر
                      </span>
                    </div>
                  </div>
                 
                </div>

                <button
                  type="submit"
                  className="btn btn-sm btn-wide btn-secondary-f text-white"
                >
                  حفظ التغييرات
                </button>
              </div>
              {/* <!--  --> */}
            </div>
          </div>
        </form>
      </div>

      {/* <!-- Edit Password --> */}
    <div className="modal fade" id="editPassword" tabIndex={-1} role="dialog" aria-labelledby="editPassword" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <form className="modal-content" onSubmit={EditPassword}>
                <div className="modal-header border-0">
                    <h5 className="modal-title font-weight-semi-bold" id="editPassword">تغيير كلمة السر</h5>
                </div>
                <div className="modal-body" onSubmit={EditPassword}>
                       
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <div className="mb-2"><span className="small text-muted-f font-weight-bold">كلمة السر الحالية</span></div>
                            </div>
                            <div className="mb-2">
                                <button type="button" className="btn smaller text-muted link-muted p-0">عرض كلمة المرور</button>
                            </div>
                        </div>
                        <input type="password" className="form-control form-control-sm text-muted mb-3" id="input-catName" placeholder="********" ref={oPass}/>
                        <div className="mb-2"><span className="small text-muted-f font-weight-bold">كلمة السر الجديدة</span></div>
                        <input type="password" className="form-control form-control-sm text-muted mb-3" id="input-catUrl" placeholder="********" ref={nPass}/>
                        <div className="mb-2"><span className="small text-muted-f font-weight-bold">إعادة كتابة كلمة السر الجديدة</span></div>
                        <input type="password" className="form-control form-control-sm text-muted mb-3" id="input-catUrl" placeholder="********" ref={cPass}/>
                </div>
                <div className="modal-footer border-0">
                    <button type="button" className="btn btn-sm text-muted font-weight-semi-bold" data-dismiss="modal">إلغاء</button>
                    <button type="submit" className="btn btn-sm btn-secondary-f text-white">حفظ</button>
                </div>
            </form>
        </div>
    </div>
    </DASBOILERPLATE>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  var User: any = {};
  const {HOST} = process.env
  await Axios.post(`${HOST}/api/auth/profile`, {
    id: Number(context.query.id),
  })
    .then((res) => {
      User = res.data;
    })
    .catch((err) => {
      User = {};
    });
  return {
    props: { User },
  };
}
