import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CreateCredit from "./Components/create-credit.component";
import EditCredit from "./Components/edit-credit.component";
import CreditList from "./Components/credit-list.component";


const App = () =>{
  return(
    <Router>
      <div className="App">
        <header className="App-header">
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand><Link to={"./create-credit"}  className="nav-link">TCOL :: Proof Of Liquidity</Link></Navbar.Brand>
                <Navbar className="justify-content-end">
                  <Nav><Link to={"./create-credit"}  className="nav-link">Create Credit</Link></Nav>
                  <Nav><Link to={"./credit-list"}  className="nav-link">Credit List</Link></Nav>
                </Navbar>
              </Container>
            </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
                <div className="wrapper">
                  <Routes>
                    <Route exact path="/" element={<CreateCredit/>}/>
                    <Route exact path="/create-credit" element={<CreateCredit/>}/>
                    <Route exact path="/edit-credit/:id" element={<EditCredit/>}/>
                    <Route exact path="/credit-list" element={<CreditList/>}/>
                  </Routes>

                </div>
            </Col>
          </Row>
        </Container>
      </div>

    </Router>
  );
}

export default App;