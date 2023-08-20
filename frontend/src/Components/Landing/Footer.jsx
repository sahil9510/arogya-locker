import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function App() {
  return (
    <MDBFooter
      bg="none"
      className="text-center text-lg-start text-muted"
      style={{ backgroundColor: "rgb(232, 245, 253)" }}
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span> Unleashing Blockchain's Potential in Healthcare</span>
        </div>


      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Arogya Locker
              </h6>
              <p>
              Arogya Locker aims to transform EHRs with Blockchain by enforcing privacy interoperability and security
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="https://healthid.ndhm.gov.in" target="_blank" rel="noreferrer" className="text-reset">
                  ABHA Number
                </a>
              </p>
              <p>
                <a href="https://healthplus.flipkart.com/" target="_blank" rel="noreferrer" className="text-reset">
                  Flipkart Health+
                </a>
              </p>
              <p>
                <a href="https://nha.gov.in/" target="_blank" rel="noreferrer" className="text-reset">
                  National Health Authority
                </a>
              </p>
              <p>
                <a href="https://www.mohfw.gov.in/" target="_blank" rel="noreferrer" className="text-reset">
                  Ministry of Health Family Welfare
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                arogyalocker@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          Made by Error 404 © 2023 
        </a>
      </div>
    </MDBFooter>
  );
}
