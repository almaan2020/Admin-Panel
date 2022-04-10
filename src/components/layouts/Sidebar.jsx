import React from "react";
import { Nav, Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import AccordionNavItem from "./AccordionNavItem";
import NavItem from "./NavItem";
import sidebarConfig from "../../config/sidebarConfig";
import logo from "../../assets/panel-logo.png";
import routes from "../../config/routes";

const Sidebar = () => {
  const { panel, home, userList, userNew, resourceList, user, resource } =
    routes;
  return (
    <div className="px-4 pt-3">
      <div className="py-2">
        <Image src={logo} thumbnail />
        &nbsp;&nbsp;
        <Link className="sidebar-text sidebar-title" to={`${panel}${home}`}>
          {sidebarConfig.sidebarTitle}
        </Link>
      </div>

      <Nav className="flex-column pt-3 pt-md-0">
        <Dropdown.Divider className="my-3" />

        <AccordionNavItem eventKey={user} title="User" icon="user">
          <NavItem title="List" link={`${panel}${userList}`} />
          <NavItem title="Create New User" link={`${panel}${userNew}`} />
        </AccordionNavItem>

        <Dropdown.Divider className="my-3" />

        <AccordionNavItem eventKey={resource} title="Resource" icon="cog">
          <NavItem title="List" link={`${panel}${resourceList}`} />
        </AccordionNavItem>
      </Nav>
    </div>
  );
};
export default Sidebar;
