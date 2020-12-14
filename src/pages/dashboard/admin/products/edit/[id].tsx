import React, { useState, useRef, useEffect } from "react";
import DASBOILERPLATE from "../../../../../components/DASBOILERPLATE";
import Select from "react-select";
import { NextPageContext } from "next";
import { CategSchema, ProductSchema } from "../../../../../services/data.spec";
import Axios from "axios";
import { Loading, Oops, Seccess } from "../../../../../components/Alert";
import { useRouter } from "next/router";

const superBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function newPost(props: {
  Categs: CategSchema[];
  Product: ProductSchema;
}) {
  interface categs {
    label: string;
    value: number;
  }
  const { Categs, Product } = props;
  // States for Craetion Content
  const name = useRef<HTMLInputElement>(null);
  const price_silver = useRef<HTMLInputElement>(null);
  const price_plaq = useRef<HTMLInputElement>(null);
  const [image, setimage] = useState<any>(Product.image);
  const [imgtmp, setimgTmp] = useState<any>();
  const [CategoriesList, setCategoriesList] = useState<categs[]>([]);
  const [Categories, setCategories] = useState<{ id: number }[]>([]);
  const [SelectCategs, setSelectCategs] = useState({});
  const [isDraft, setIsDraft] = useState(!Product.published);

  const GetCategs = async () => {
    const List: categs[] = [];
    await Categs.map((data) => {
      List.push({ label: data.name, value: data.id });
    });
    return setCategoriesList(List);
  };
  const CheckImg = (e: any) => {
    const ImgsExt = ["png", "jpg", "svg"];
    const imgPart = e.target.value.split(".");
    const Ext = imgPart[imgPart.length - 1];
    if (ImgsExt.indexOf(Ext) >= 0) {
      setimgTmp(e.target.files);
      var blob = new Blob(e.target.files);
      superBase64(blob).then((res) => {
        setimage(res);
      });
    } else {
      setimgTmp(null!);
    }
  };
  const newProduct = async(e: any) => {
    e.preventDefault();
    Loading()
    let bodyFormatData = new FormData()
    bodyFormatData.append("files",imgtmp[0])
    var product ={
      name: name.current?.value,
      image: String(image),
      price_silver: Number(price_silver.current?.value),
      price_blacquer: Number(price_plaq.current?.value),
      published: !isDraft,
      categories: Categories
    }
   await Axios.post("https://www.master-7rqtwti-j7xaia2tpvmd6.us-2.platformsh.site/upload",bodyFormatData,{headers:{"Content-Type": "multipart/form-data"}}).then(res=>{
     const imgUrl = `https://www.master-7rqtwti-j7xaia2tpvmd6.us-2.platformsh.site${res.data[0].url}`
     product.image = imgUrl
     Axios.put(`/api/products/${Product.id}`,product).then(res=>{
      Seccess()
      Router.push('/dashboard/admin/products')
    }).catch(err=>{
      Oops()
    })
   }).catch(err=>{
    Axios.put(`/api/products/${Product.id}`,product).then(res=>{
      Seccess()
      Router.push('/dashboard/admin/products')
    }).catch(err=>{
      Oops()
    })
   })
  };
  const on_change = (val: any) => {
    setCategories([{ id: val.value }]);
  };
  const SetCateg = async () => {
    await Product.categories?.map((val) => {
      setCategories([...Categories, { id: val.id }]);
      setSelectCategs({ label: val.name, value: val.id });
    });
  };
  const Router = useRouter()
  useEffect(() => {
    if (Product.id == 0) {
      Router.push("/dashboard/admin")
    }
    GetCategs();
    SetCateg();
  }, []);
  return (
    <DASBOILERPLATE title={Product.name}>
      <div className="col-12 col-lg-10">
        <form className="container spacer-70" onSubmit={newProduct}>
          <div className="mb-0">
            <h5 className="font-size-2 font-weight-bold text-muted-f mb-0">
              اسم المنتج
            </h5>
          </div>
          <div className="row justify-content-between mt-n3">
            <div className="col-12 col-lg-8">
              <div className="mt-5 mb-0 mb-md-3">
                <div className="input-group input-group-merge">
                  <input
                    type="text"
                    defaultValue={Product.name}
                    className="form-control form-control-lg font-size-1 text-muted-f border-0 rounded-lg shadow"
                    id="Ds-articleTitle"
                    placeholder="إضافة عنوان"
                    ref={name}
                  />
                </div>
                <img
                  src="/assets/img/misc/office.svg"
                  className="d-none d-lg-block"
                  alt="svg"
                />
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="sticky-top mt-5 mb-3">
                <div className="card border-0 rounded-lg shadow-sm">
                  <div className="card-body">
                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small test-muted-f font-weight-bold mb-0">
                          صورة المنتج
                        </h6>
                      </div>

                      <div className="card mb-3" role="tablist">
                        <div id="PostImg">
                          <div className="border-bottom mb-0">
                            <button
                              type="button"
                              className="btn btn-sm btn-block text-muted d-flex justify-content-between collapsed"
                              data-toggle="collapse"
                              data-target="#UploadPostImg"
                              aria-expanded="false"
                              aria-controls="UploadPostImg"
                            >
                              <span>
                                <i className="far fa-image pl-2"></i>رفع صورة
                              </span>
                            </button>
                          </div>
                        </div>
                        <div
                          id="UploadPostImg"
                          className="collapse"
                          aria-labelledby="PostImg"
                          data-parent="#UploadPostImg"
                        >
                          <div className="card-body">
                            <label
                              className="file-attachment-input"
                              htmlFor="fileAttachmentInput"
                            >
                              <span
                                id="customFile"
                                className="font-weight-semi-bold"
                              >
                                تصفح جهازك وقم برفع صورة.
                              </span>
                              <small className="d-block text-muted pt-2">
                                الحد الأقصى لحجم الملف 10 ميغابايت
                              </small>

                              <input
                                id="fileAttachmentInput"
                                name="file-attachment"
                                type="file"
                                className="file-attachment-input-label"
                                onChange={CheckImg}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small test-muted-f font-weight-bold mb-0">
                          سعر الفضة
                        </h6>
                      </div>
                      <input
                        type="number"
                        defaultValue={Product.price_silver}
                        className="form-control form-control-sm font-size-1 text-muted-f rounded shadow-sm"
                        placeholder="1000 دج"
                        ref={price_silver}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small test-muted-f font-weight-bold mb-0">
                          سعر البلاكيور
                        </h6>
                      </div>
                      <input
                        type="number"
                        defaultValue={Product.price_blacquer}
                        className="form-control form-control-sm font-size-1 text-muted-f rounded shadow-sm"
                        placeholder="1000 دج"
                        ref={price_plaq}
                      />
                    </div>
                    {CategoriesList ? (
                      <div className="mb-4">
                        <div className="mb-2">
                          <h6 className="small text-muted-f font-weight-bold mb-0">
                            التصنيفات
                          </h6>
                        </div>
                        <Select
                          multi={true}
                          value={SelectCategs}
                          options={[...CategoriesList]}
                          onChange={on_change}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small text-muted-f font-weight-bold mb-0">
                          اخفاء المنتج
                        </h6>
                      </div>
                      <span className="custom-control custom-switch mr-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="hidePost"
                          onChange={(e) => {
                            setIsDraft(!isDraft);
                          }}
                          defaultChecked={isDraft}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="hidePost"
                        ></label>
                      </span>
                    </div>

                    <div className="d-flex mb-4">
                      <button
                        type="submit"
                        className="btn w-50 btn-sm btn-secondary-f font-weight-semi-bold text-white"
                      >
                        <i className="fal fa-file-alt pl-2"></i>حفظ
                      </button>

                      <button
                        type="button"
                        className="btn w-50 btn-sm btn-danger-f font-weight-semi-bold text-white mr-2"
                      >
                        <i className="fal fa-redo-alt pl-2"></i>إلغاء
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DASBOILERPLATE>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const {HOST} = process.env
  var Categs: CategSchema[] = [];
  var Product: ProductSchema = {
    id: 0,
    name: "",
    price_silver: 0,
    price_blacquer: 0,
  };
  await Axios.get(`${HOST}/api/products/${context.query.id}`)
    .then((res) => {
      Product = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(async () => {
      await Axios.get(`${HOST}/api/categories`)
        .then((res) => {
          Categs = res.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    });
  return {
    props: { Categs, Product },
  };
}
