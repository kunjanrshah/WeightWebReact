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

function RemarkList() {
  const [settingConst,setsettingConst]=useState({});
  const baseUrl='remark';
  const [remarks, setRemarks] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [editedRemarkNo, setEditedRemarkNo] = useState(false);
  const formInput = useRef(null);
  const editRefs = useRef([]);

  async function getRemark(){
    setsettingConst(await SettingConstant());

    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    
    setRemarks(data);
  }

  useEffect(getRemark, [])


  async function handleNewRemark (buttonFlag) {

    if(buttonFlag=='confirm')
    {
      const data = await ApiService(`${baseUrl}`, 'POST', JSON.stringify({
        "remark": formInput.current.value,
      }));

      getRemark();
      setDisplayForm(!displayForm);
    }
    else
    {
      setDisplayForm(!displayForm);
    }
  }

  async function handleRemoveRemark (id) {
      const data = await ApiService(`${baseUrl}/${id}`,'DELETE',null);
      if(data.errorMsg)
      alert(data.errorMsg);
      else
      getRemark();
  }

  async function handleEditRemark (id) {
    setEditedRemarkNo(id); 
  }

  async function handleUpdateRemark (id) {
    const data = await ApiService(`${baseUrl}/${id}`,'PATCH', JSON.stringify({
        "remark": editRefs.current[`remarkNo_${id}`].value,
      }));

    getRemark();
    setEditedRemarkNo(false);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{settingConst?.remark} Master Data</Card.Title>
                <p className="card-category">
                  List of {settingConst?.remark}
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {!displayForm && <button className="btn btn-primary float-right mr-3" onClick={() => {setDisplayForm(!displayForm)}}> + Add </button>}
                {
                  displayForm && (<>
                          <div className="form-row align-items-center float-right mr-3">
                            <div className="col-auto">
                              <label className="sr-only" htmlFor="inlineFormInput">{settingConst?.remark}</label>
                              <input ref={formInput} type="text" className="form-control mb-2" id="inlineFormInput" placeholder={settingConst?.remark} />
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-primary mb-2" onClick={() => handleNewRemark('confirm')}>Confirm</button>
                            </div>
                            <div className="col-auto">
                              <button  className="btn btn-default mb-2" onClick={() => handleNewRemark('cancel')}>Cancel</button>
                            </div>
                          </div>                  
                  </>)
                }
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Id</th>
                      <th className="border-0">{settingConst?.remark}</th>
                      <th className="border-0">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      remarks.map((ele, index) => {
                        return (
                          editedRemarkNo !== ele.id 
                          ?
                            <tr key={ele.id} >
                              <td>{index + 1}</td>
                              <td>{ele.remark}</td>
                              <td>
                                <button className="btn btn-sm btn-warning mb-2 mr-2" onClick={() => handleEditRemark(ele.id)}>EDIT</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => handleRemoveRemark(ele.id)}>DELETE</button>
                              </td>
                            </tr>
                          :
                            <tr key={ele.id}>
                              <td>{index + 1}</td>
                              <td><input type="text" ref={reference => editRefs.current[`remarkNo_${ele.id}`] = reference} defaultValue={ele.remark}/></td>
                              <td>
                                <button className="btn btn-sm btn-success mb-2 mr-2" onClick={() => handleUpdateRemark(ele.id)}>UPDATE</button>
                                <button className="btn btn-sm btn-danger mb-2" onClick={() => setEditedRemarkNo(false)}>CANCEL</button>
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

export default RemarkList;
