import React from "react";
import { Row, Col } from "reactstrap";
import Heart from "mdi-react/HeartIcon";
const image = `${process.env.PUBLIC_URL}/img/images/SB-1.png`;

class Footer extends React.PureComponent {
  render() {
    return (
      <div className="Footer">
        <Row className="Footer-row">
          <Col
            xs={12}
            md={3}
            lg={3}
            xl={3}
            className="Footer-col__left"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <img src={image} className="Footer-logo" />

            <div />
          </Col>

          <Col xs={12} md={6} lg={6} xl={6} className="Footer-col__middle">
            
          </Col>
          <Col xs={12} md={3} lg={3} xl={3} className="Footer-col__right">
            <span className="Footer-href__bottom2">
              Made with <Heart className="Footer-heart" /> by{" "}
              <a href="http://toolynk.com" className="Footer-href__bottom">
                TOOLYNK
              </a>
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Footer;
