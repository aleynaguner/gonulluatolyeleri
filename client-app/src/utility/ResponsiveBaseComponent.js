import { Component } from "react";

// Sayfa boyutu değiştikçe render oluyor. Çok fazla. Bu base component son çare olmalı
export default class ResponsiveBaseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { windowWidth: window.innerWidth };
  }

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }
}
