import { AppConfig } from "./AppConfig";
import { Component } from "react";

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
  }

  static contextType = AppConfig;
}
