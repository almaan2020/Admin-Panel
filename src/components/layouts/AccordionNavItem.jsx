import React from "react";
import { Nav, Accordion } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const AccordionNavItem = (props) => {
  const { eventKey, title, icon, children = null } = props;
  const location = useLocation();
  const { pathname } = location;
  const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

  return (
    <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Button
          as={Nav.Link}
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            {icon ? (
              <span className={`sidebar-icon fa fa-${icon}`}> </span>
            ) : null}
            <span className="sidebar-text">{title}</span>
          </span>
        </Accordion.Button>
        <Accordion.Body>
          <Nav className="flex-column">{children}</Nav>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionNavItem;
