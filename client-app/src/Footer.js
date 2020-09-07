import React, { Component } from "react";
import { Menu , Image, Icon } from "semantic-ui-react";
import "./Footer.css";

export default class Footer extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu className="navbar" size='mini' fixed="bottom" text>
        <Menu.Item>
          <Image className="logo" size="mini"></Image>
        </Menu.Item>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          Ana Sayfa
        </Menu.Item>
        <Menu.Item
          name="aboutUs"
          active={activeItem === "aboutUs"}
          onClick={this.handleItemClick}
        >
          Hakkımızda
        </Menu.Item>
        <Menu.Item
          name="workshops"
          active={activeItem === "workshops"}
          onClick={this.handleItemClick}
        >
          Atölyelerimiz
        </Menu.Item>
        <Menu.Item
          name="blog"
          active={activeItem === "blog"}
          onClick={this.handleItemClick}
        >
          Blog
        </Menu.Item>
        <Menu.Item
          name="contact"
          active={activeItem === "contact"}
          onClick={this.handleItemClick}
        >
          İletişim
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item>
                <Icon name="facebook square" size="large"></Icon>
            </Menu.Item>
            <Menu.Item>
                <Icon name="twitter square" size="large"></Icon>
            </Menu.Item>
            <Menu.Item>
                <Icon name="linkedin square" size="large"></Icon>
            </Menu.Item>
            <Menu.Item>
                <Icon name="youtube square" size="large"></Icon>
            </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
