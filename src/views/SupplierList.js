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

function SupplierList() {
  const [settingConst,setsettingConst]=useState({});
  const baseUrl='supplier';
  const [suppliers, setSuppliers] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [editedSupplierNo, setEditedSupplierNo] = useState(false);
  const formInput = useRef(null);
  const editRefs = useRef([]);

  async function getSupplier(){
    setsettingConst(await SettingConstant());
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    
    setSuppliers(data);
  }

  useEffect(getSupplier, [])


  async function handleNewSupplier (buttonFlag) {

    if(buttonFlag=='confirm')
    {
      const data = await ApiService(`${baseUrl}`, 'POST', JSON.stringify({
        "supplier_name": formInput.current.value,
      }));

      getSupplier();
      setDisplayForm(!displayForm);
    }
    else
    {
      setDisplayForm(!displayForm);
    }
  }

  async function handleRemoveSupplier (id) {
      const data = await ApiService(`${baseUrl}/${id}`,'DELETE',null);
      if(data.errorMsg)
      alert(data.errorMsg);
      else
      getSupplier();
  }

  async function handleEditSupplier (id) {
    setEditedSupplierNo(id); 
  }

  async function handleUpdateSupplier (id) {
    const data = await ApiService(`${baseUrl}/${id}`,'PATCH', JSON.stringify({
        "supplier_name": editRefs.current[`supplierNo_${id}`].value,
      }));

    getSupplier();
    setEditedSupplierNo(false);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{settingConst?.supplier} Master Data</Card.Title>
                <p className="card-category">
                  List of {settingConst?.supplier}
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {!displayForm && <button className="btn btn-primary float-right mr-3" onClick={() => {setDisplayForm(!displayForm)}}> + Add </button>}
                {
                  displayForm && (<>
                          <div className="form-row align-items-center float-right mr-3">
                            <div className="col-auto">
                              <label className="sr-only" htmlFor="inlineFormInput">{settingConst?.supplier}</label>
                              <input ref={formInput} type="text" className="form-control mb-2" id="inlineFormInput" placeholder={settingConst?.supplier} />
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-primary mb-2" onClick={() => handleNewSupplier('confirm')}>Confirm</button>
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-default mb-2" onClick={() => handleNewSupplier('cancel')}>Cancel</button>
                            </div>
                          </div>                  
                  </>)
                }
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Id</th>
                      <th className="border-0">{settingConst?.supplier}</th>
                      <th className="border-0">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      suppliers.map((ele, index) => {
                        return (
                          editedSupplierNo !== ele.id 
                          ?
                            <tr key={ele.id} >
                              <td>{index + 1}</td>
                              <td>{ele.supplier_name}</td>
                              <td>
                                <button className="btn btn-sm btn-warning mb-2 mr-2" onClick={() => handleEditSupplier(ele.id)}>EDIT</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => handleRemoveSupplier(ele.id)}>DELETE</button>
                              </td>
                            </tr>
                          :
                            <tr key={ele.id}>
                              <td>{index + 1}</td>
                              <td><input type="text" ref={reference => editRefs.current[`supplierNo_${ele.id}`] = reference} defaultValue={ele.supplier_name}/></td>
                              <td>
                                <button className="btn btn-sm btn-success mb-2 mr-2" onClick={() => handleUpdateSupplier(ele.id)}>UPDATE</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => setEditedSupplierNo(false)}>CANCEL</button>
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

export default SupplierList;
