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

function VillegeList() {
  const [settingConst,setsettingConst]=useState({});
  const baseUrl='villege';
  const [villeges, setVilleges] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [editedVillegeNo, setEditedVillegeNo] = useState(false);
  const formInput = useRef(null);
  const editRefs = useRef([]);

  async function getVillege(){
    setsettingConst(await SettingConstant());
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    
    setVilleges(data);
  }

  useEffect(getVillege, [])


  async function handleNewVillege (buttonFlag) {

    if(buttonFlag=='confirm')
    {
      const data = await ApiService(`${baseUrl}`, 'POST', JSON.stringify({
        "villege_name": formInput.current.value,
      }));

      getVillege();
      setDisplayForm(!displayForm);
    }
    else
    {
      setDisplayForm(!displayForm);
    }
  }

  async function handleRemoveVillege (id) {
      const data = await ApiService(`${baseUrl}/${id}`,'DELETE',null);
      if(data.errorMsg)
      alert(data.errorMsg);
      else
      getVillege();
  }

  async function handleEditVillege (id) {
    setEditedVillegeNo(id); 
  }

  async function handleUpdateVillege (id) {
    const data = await ApiService(`${baseUrl}/${id}`,'PATCH', JSON.stringify({
        "villege_name": editRefs.current[`villegeNo_${id}`].value,
      }));

    getVillege();
    setEditedVillegeNo(false);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{ settingConst?.villege} Master Data</Card.Title>
                <p className="card-category">
                  List of { settingConst?.villege}
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {!displayForm && <button className="btn btn-primary float-right mr-3" onClick={() => {setDisplayForm(!displayForm)}}> + Add </button>}
                {
                  displayForm && (<>
                          <div className="form-row align-items-center float-right mr-3">
                            <div className="col-auto">
                              <label className="sr-only" htmlFor="inlineFormInput">{ settingConst?.villege}</label>
                              <input ref={formInput} type="text" className="form-control mb-2" id="inlineFormInput" placeholder={ settingConst?.villege} />
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-primary mb-2" onClick={() => handleNewVillege('confirm')}>Confirm</button>
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-default mb-2" onClick={() => handleNewVillege('cancel')}>Cancel</button>
                            </div>
                          </div>                  
                  </>)
                }
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Id</th>
                      <th className="border-0">{ settingConst?.villege}</th>
                      <th className="border-0">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      villeges.map((ele, index) => {
                        return (
                          editedVillegeNo !== ele.id 
                          ?
                            <tr key={ele.id} >
                              <td>{index + 1}</td>
                              <td>{ele.villege_name}</td>
                              <td>
                                <button className="btn btn-sm btn-warning mb-2 mr-2" onClick={() => handleEditVillege(ele.id)}>EDIT</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => handleRemoveVillege(ele.id)}>DELETE</button>
                              </td>
                            </tr>
                          :
                            <tr key={ele.id}>
                              <td>{index + 1}</td>
                              <td><input type="text" ref={reference => editRefs.current[`villegeNo_${ele.id}`] = reference} defaultValue={ele.villege_name}/></td>
                              <td>
                                <button className="btn btn-sm btn-success mb-2 mr-2" onClick={() => handleUpdateVillege(ele.id)}>UPDATE</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => setEditedVillegeNo(false)}>CANCEL</button>
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

export default VillegeList;
