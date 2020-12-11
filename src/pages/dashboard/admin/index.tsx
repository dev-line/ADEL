import React from 'react'
import DASBOILERPLATE from '../../../components/DASBOILERPLATE'

export default function index() {
    return (
        <DASBOILERPLATE title="الرئيسية">
            <div className="col-md-10">
                <div className="container spacer-70">

                    <div className="row card-budget">
                        {/* <!-- Card 01 --> */}
                        <div className="col-6 col-lg-3 px-2 mb-3 mb-lg-0">
                            <div className="card shadow-lg rounded-lg">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <div className="icon-shape bg-primary-f shadow-primary text-white">
                                            <i className="fal fa-file-alt"></i>
                                        </div>
                                    </div>
                                    <h5 className="h3 font-weight-bolder text-muted-f mb-1">65</h5>
                                    <a href="./allPosts.html" className="d-block small text-muted font-weight-bold stretched-link">المقالات</a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Card 02 --> */}
                        <div className="col-6 col-lg-3 px-2 mb-3 mb-lg-0">
                            <div className="card shadow-lg rounded-lg">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <div className="icon-shape bg-danger-f shadow-danger text-white">
                                            <i className="fal fa-comment-lines"></i>
                                        </div>
                                    </div>
                                    <h5 className="h3 font-weight-bolder text-muted-f mb-1">670</h5>
                                    <a href="./comments.html" className="d-block small text-muted font-weight-bold stretched-link">التعليقات</a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Card 03 --> */}
                        <div className="col-6 col-lg-3 px-2 mb-3 mb-lg-0">
                            <div className="card shadow-lg rounded-lg">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <div className="icon-shape bg-warning-f shadow-warning text-white">
                                            <i className="fal fa-user-friends"></i>
                                        </div>
                                    </div>
                                    <h5 className="h3 font-weight-bolder text-muted-f mb-1">5</h5>
                                    <a href="./members.html" className="d-block small text-muted font-weight-bold stretched-link">الأعضاء</a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Card 04 --> */}
                        <div className="col-6 col-lg-3 px-2 mb-3 mb-lg-0">
                            <div className="card shadow-lg rounded-lg">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <div className="icon-shape bg-success-f shadow-success text-white">
                                            <i className="fal fa-inbox"></i>
                                        </div>
                                    </div>
                                    <h5 className="h3 font-weight-bolder text-muted-f mb-1">163</h5>
                                    <a href="inbox.html" className="d-block small text-muted font-weight-bold stretched-link">الرسائل</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DASBOILERPLATE>
    )
}
