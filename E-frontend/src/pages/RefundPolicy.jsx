import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

const RefundPolicy =function(){
    return(
        <>
        <Meta title={"Refund Policy"}/>
        <BreadCrumb title="Refund Policy"/>
        <section className="policy-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="refund">
                            
                        </div>
                    </div>
                </div>
            </div>

        </section>
        </>
    )
}

export default RefundPolicy;