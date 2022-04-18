import React, { useEffect, useState, useRef } from "react";
import { ApiService } from "services";
import {SettingConstant} from "../services/constants.js";

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

function VehicleList() {
  const [settingConst,setsettingConst]=useState({});
  const baseUrl='vehicle';
  const [vehicles, setVehicles] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [editedVehicleNo, setEditedVehicleNo] = useState(false);
  const formInput = useRef(null);
  const editRefs = useRef([]);

  async function getVehicle(){
    setsettingConst(await SettingConstant());
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    
    setVehicles(data);
  }

  useEffect(getVehicle, [])


  async function handleNewVehicle (buttonFlag) {

    if(buttonFlag=='confirm')
    {
      const data = await ApiService(`${baseUrl}`, 'POST', JSON.stringify({
        "vehicle_number": formInput.current.value,
      }));

      getVehicle();
      setDisplayForm(!displayForm);
    }
    else
    {
      setDisplayForm(!displayForm);
    }
  }

  async function handleRemoveVehicle (id) {
      const data = await ApiService(`${baseUrl}/${id}`,'DELETE',null);
      if(data.errorMsg)
      alert(data.errorMsg);
      else
      getVehicle();
  }

  async function handleEditVehicle (id) {
    setEditedVehicleNo(id); 
  }

  async function handleUpdateVehicle (id) {
    const data = await ApiService(`${baseUrl}/${id}`,'PATCH', JSON.stringify({
        "vehicle_number": editRefs.current[`vehicleNo_${id}`].value,
      }));

    getVehicle();
    setEditedVehicleNo(false);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{settingConst?.vehicle} Master Data</Card.Title>
                <p className="card-category">
                  List of {settingConst?.vehicle}
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {!displayForm && <button className="btn btn-primary float-right mr-3" onClick={() => {setDisplayForm(!displayForm)}}> + Add </button>}
                {
                  displayForm && (<>
                          <div className="form-row align-items-center float-right mr-3">
                            <div className="col-auto">
                              <label className="sr-only" htmlFor="inlineFormInput">{settingConst?.vehicle}</label>
                              <input ref={formInput} type="text" className="form-control mb-2" id="inlineFormInput" placeholder={settingConst?.vehicle} />
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-primary mb-2" onClick={() => handleNewVehicle('confirm')}>Confirm</button>
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-default mb-2" onClick={() => handleNewVehicle('cancel')}>Cancel</button>
                            </div>
                          </div>                  
                  </>)
                }
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Id</th>
                      <th className="border-0">{settingConst?.vehicle}</th>
                      <th className="border-0">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      vehicles.map((ele, index) => {
                        return (
                          editedVehicleNo !== ele.id 
                          ?
                            <tr key={ele.id} >
                              <td>{index + 1}</td>
                              <td>{ele.vehicle_number}</td>
                              <td>
                                <button className="btn btn-sm btn-warning mb-2 mr-2" onClick={() => handleEditVehicle(ele.id)}>EDIT</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => handleRemoveVehicle(ele.id)}>DELETE</button>
                              </td>
                            </tr>
                          :
                            <tr key={ele.id}>
                              <td>{index + 1}</td>
                              <td><input type="text" ref={reference => editRefs.current[`vehicleNo_${ele.id}`] = reference} defaultValue={ele.vehicle_number}/></td>
                              <td>
                                <button className="btn btn-sm btn-success mb-2 mr-2" onClick={() => handleUpdateVehicle(ele.id)}>UPDATE</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => setEditedVehicleNo(false)}>CANCEL</button>
                              </td>
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

export default VehicleList;
