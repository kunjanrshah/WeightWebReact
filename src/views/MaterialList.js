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

function MaterialList() {
  const [settingConst,setsettingConst]=useState({});
  const baseUrl='material';
  const [materials, setMaterials] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [editedMaterialNo, setEditedMaterialNo] = useState(false);
  const formInput = useRef(null);
  const editRefs = useRef([]);

  async function getMaterial(){
    setsettingConst(await SettingConstant());

    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    
    setMaterials(data);
  }

  useEffect(getMaterial, [])


  async function handleNewMaterial (buttonFlag) {

    if(buttonFlag=='confirm')
    {
      const data = await ApiService(`${baseUrl}`, 'POST', JSON.stringify({
        "material_name": formInput.current.value,
      }));

      getMaterial();
      setDisplayForm(!displayForm);
    }
    else
    {
      setDisplayForm(!displayForm);
    }
  }

  async function handleRemoveMaterial (id) {
      const data = await ApiService(`${baseUrl}/${id}`,'DELETE',null);
      if(data.errorMsg)
      alert(data.errorMsg);
      else
      getMaterial();
  }

  async function handleEditMaterial (id) {
    setEditedMaterialNo(id); 
  }

  async function handleUpdateMaterial (id) {
    const data = await ApiService(`${baseUrl}/${id}`,'PATCH', JSON.stringify({
        "material_name": editRefs.current[`materialNo_${id}`].value,
      }));

    getMaterial();
    setEditedMaterialNo(false);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{settingConst?.material} Master Data</Card.Title>
                <p className="card-category">
                  List of {settingConst?.material}
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {!displayForm && <button className="btn btn-primary float-right mr-3" onClick={() => {setDisplayForm(!displayForm)}}> + Add </button>}
                {
                  displayForm && (<>
                          <div className="form-row align-items-center float-right mr-3">
                            <div className="col-auto">
                              <label className="sr-only" htmlFor="inlineFormInput">{settingConst?.material}</label>
                              <input ref={formInput} type="text" className="form-control mb-2" id="inlineFormInput" placeholder={settingConst?.material} />
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-primary mb-2" onClick={() => handleNewMaterial('confirm')}>Confirm</button>
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-default mb-2" onClick={() => handleNewMaterial('cancel')}>Cancel</button>
                            </div>
                          </div>                  
                  </>)
                }
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Id</th>
                      <th className="border-0">{settingConst?.material}</th>
                      <th className="border-0">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      materials.map((ele, index) => {
                        return (
                          editedMaterialNo !== ele.id 
                          ?
                            <tr key={ele.id} >
                              <td>{index + 1}</td>
                              <td>{ele.material_name}</td>
                              <td>
                                <button className="btn btn-sm btn-warning mb-2 mr-2" onClick={() => handleEditMaterial(ele.id)}>EDIT</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => handleRemoveMaterial(ele.id)}>DELETE</button>
                              </td>
                            </tr>
                          :
                            <tr key={ele.id}>
                              <td>{index + 1}</td>
                              <td><input type="text" ref={reference => editRefs.current[`materialNo_${ele.id}`] = reference} defaultValue={ele.material_name}/></td>
                              <td>
                                <button className="btn btn-sm btn-success mb-2 mr-2" onClick={() => handleUpdateMaterial(ele.id)}>UPDATE</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => setEditedMaterialNo(false)}>CANCEL</button>
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

export default MaterialList;
