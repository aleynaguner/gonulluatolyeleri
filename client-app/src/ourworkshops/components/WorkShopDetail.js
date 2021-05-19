import React, { Component } from "react";
import { Container, Row } from "../../components/Grid";
import { withRouter } from "react-router-dom";

class WorkShopDetailContent extends Component {
  render() {
    return (
      <Container>
        <Row isCentered>
          <p className="h3 font-weight-normal">{this.props.id}</p>
        </Row>
      </Container>
    );
  }
}

const WorkShopDetail = withRouter((props) => (
  <WorkShopDetailContent {...props} />
));

export default WorkShopDetail;
