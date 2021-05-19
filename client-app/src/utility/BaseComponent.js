import { AppConfig } from "./AppConfig";
import { Component } from "react";
import componentHelper from "./componentHelper";

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.componentHelper = componentHelper;
  }
  static contextType = AppConfig;
}
