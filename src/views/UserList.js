import React, { useEffect, useState } from "react";
import { ApiService } from "services";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const baseUrl='users';
    
    const data = await ApiService(baseUrl, 'GET',null);
    
    setUsers(data.data);

    console.log("🚀 ~ file: UserList.js ~ line 29 ~ useEffect ~ data", data)
  }, [])


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Users</Card.Title>
                <p className="card-category">
                  List of Users
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">First Name</th>
                      <th className="border-0">Last Name</th>
                      <th className="border-0">UserName</th>
                      <th className="border-0">Role</th>
                      <th className="border-0">Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.map(ele => {
                        return (
                          <tr key={ele.id}>
                            <td>{ele.firstName}</td>
                            <td>{ele.lastName}</td>
                            <td>{ele.email}</td>
                            <td>{ele.role}</td>
                            <td>{ele.password}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserList;
