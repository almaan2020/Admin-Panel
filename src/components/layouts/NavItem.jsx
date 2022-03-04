import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavItem = (props) => {
  const { title, link, icon } = props;
  const location = useLocation();
  const { pathname } = location;
  const navItemClassName = link === pathname ? "active" : "";

  return (
    <Nav.Item className={navItemClassName}>
      <Nav.Link as={Link} to={link}>
        <span>
          {icon ? <i className={`sidebar-icon fa fa-${icon}`}></i> : null}
          <span className="sidebar-text">{title}</span>
        </span>
      </Nav.Link>
    </Nav.Item>
  );
};

export default NavItem;
