import React, { useEffect, useState, useRef } from "react";
import { ApiService } from "services";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ReportEdit from './ReportEdit.js';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
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
  Form,
} from "react-bootstrap";

function ReportList() {
  const [settingConst,setsettingConst]=useState({});
  const baseUrl='weighing';
  // const [List,setList]=useState([]);
  const [MasterChecked,setMasterChecked]=useState(false);
  const [SelectedList,setSelectedList]=useState([]);
  const [isRecordEdited, setRecordEdited] = useState(false)
  const [statusValue,setstatusValue]=useState('completed');
  const charges = useRef(null);

   // Select/ UnSelect Table rows
   function onMasterCheck(e) {
     console.log("in master check");
    let tempList = reports;
    // Check/ UnCheck All Items
    tempList.map((report) => (report.selected = e.target.checked));

    console.log(tempList);
    //Update State
    setMasterChecked(e.target.checked);
    setReports(tempList);
    let selectedItems=reports.filter((e) => e.selected);
    setSelectedList(selectedItems);
  }

  // Update List Item's state and Master Checkbox State
  function onItemCheck(e, item) {
    console.log("in item check",item);

    let tempList = reports;
    tempList.map((report) => {
      if (report.id === item.id) {
        report.selected = e.target.checked;
      }
      return report;
    });

     //To Control Master Checkbox State
     const totalItems = reports.length;
     let selectedItems=reports.filter((e) => e.selected);

     const totalCheckedItems = selectedItems.length;

    setMasterChecked(totalItems==totalCheckedItems);
    setReports(tempList);
    setSelectedList(selectedItems);
  }

  function handleEditReport()
  {
    if (SelectedList.length != 1) {
      alert('You can edit single record at a time');
      return;
    }
    setRecordEdited(true);
    console.log("🚀 ~ file: Report.js ~ line 66 ~ ReportList ~ SelectedList", SelectedList)

  }

  function handleCallback(){
    setRecordEdited(false);
    getReport();
  }

  async function handleDeleteReport()
  {
      let ids=SelectedList.map((item)=>{ return item.id });
      let payload= JSON.stringify({deleteids: ids})
      console.log(payload);
      let data = await ApiService(`${baseUrl}/deleteAllById`,'DELETE',payload);
      getReport();
  }


  const [reports, setReports] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [editedReportNo, setEditedReportNo] = useState(false);
  const formInput = useRef(null);
  const editRefs = useRef([]);

  //vehicle
  let [vehicleId, setVehicleId] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  async function getVehicle(){
    const baseUrl='vehicle';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);

    setVehicles(data);
  }
  let handleVehicleChange = (e) => {
    setVehicleId(e.target.value);
  }
  //close vehicle

   //supplier
   let [supplierId, setSupplierId] = useState(null);
   const [suppliers, setSuppliers] = useState([]);
   async function getSupplier(){
    const baseUrl='supplier';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    setSuppliers(data);
   }

   let handleSupplierChange = (e) => {
     setSupplierId(e.target.value);
   }
   //close supplier

   //material
   let [materialId, setMaterialId] = useState(null);
   const [materials, setMaterials] = useState([]);
   async function getMaterial(){
    const baseUrl='material';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    setMaterials(data);
   }

   let handleMaterialChange = (e) => {
     setMaterialId(e.target.value);
   }
   //close material

  //receiver
  let [receiverId, setReceiverId] = useState(null);
  const [receivers, setReceivers] = useState([]);
  async function getReceiver(){
    const baseUrl='receiver';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    setReceivers(data);
  }

  let handleReceiverChange = (e) => {
    setReceiverId(e.target.value);
  }
  //close receiver

  //Villege
  let [villegeId, setVillegeId] = useState(null);
  const [villeges, setVilleges] = useState([]);
  async function getVillege(){
    const baseUrl='villege';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    setVilleges(data);
  }

  let handleVillegeChange = (e) => {
    setVillegeId(e.target.value);
  }
  //close Villege

  //Remark
  let [remarkId, setRemarkId] = useState(null);
  const [remarks, setRemarks] = useState([]);
  async function getRemark(){
    const baseUrl='remark';
    const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
    setRemarks(data);
  }

  let handleRemarkChange = (e) => {
    setRemarkId(e.target.value);
  }
  //close Remark

   //Remark
   let [userId, setuserId] = useState(null);
   const [users, setUsers] = useState([]);
   const [dateRange, setDateRange] = useState([]);
   async function getUsers(){
     const baseUrl='users';
     const data = await ApiService(`${baseUrl}?page=1&take=10`, 'GET', null);
     setUsers(data.data);
   }

  function handleDateRangeChange (data) {
    if (data && data.length) {
      data = data.map(ele => {
        const yyyy = ele.getFullYear();
        const dd = String(ele.getDate()).padStart(2, '0');
        const mm = String(ele.getMonth() + 1).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      })
      setDateRange(data);
    } else {
      setDateRange([]);
    }
  }

  function handleStatus(e){
    setstatusValue(e.target.value);
  }
  async function getReport(){

    let param_string='';
    if(remarkId)
      param_string=param_string+`&remarkId=${remarkId}`;
    if(villegeId)
      param_string=param_string+`&villegeId=${villegeId}`;
    if(materialId)
      param_string=param_string+`&materialId=${materialId}`;
    if(supplierId)
      param_string=param_string+`&supplierId=${supplierId}`;
    if(vehicleId)
      param_string=param_string+`&vehicleId=${vehicleId}`;
    if(receiverId)
      param_string=param_string+`&receiverId=${receiverId}`;
    if(userId)
      param_string=param_string+`&userId=${userId}`;
    if(dateRange.length)
      param_string=param_string+`&startDate=${dateRange[0]}&endDate=${dateRange[1]}`;
    if(statusValue)
      param_string=param_string+`&status=${statusValue}`;
    if(Sno)
      param_string=param_string+`&sno=${+Sno}`;
    if(Charges)
      param_string=param_string+`&charges=${+Charges}`;

    let url=`${baseUrl}?page=1&take=10`;
    if(param_string!='')
    url=url+param_string;

    let data = await ApiService(`${url}`, 'GET', null);
    data.forEach((report) => {report.selected = false});
    //console.log(data);
    setReports(data);
    setSelectedList([]);
  }

  let [Charges, setCharges] = useState(null);
  let [Sno, setSno] = useState(null);

  function handleCharges(e)
  {
     setCharges(e.target.value);
  }

  function handleSno(e)
  {
    setSno(e.target.value);
  }

  async function getSettingConst(){
    setsettingConst(await SettingConstant());
  }

  useEffect(() => {
    getSettingConst();
    getVehicle();
    getSupplier();
    getMaterial();
    getReceiver();
    getVillege();
    getRemark();
    if (localStorage.getItem('privilege') === "ADMIN") {
      getUsers();
    }
  }, []);

  useEffect(() => {
    console.log("changed in variables");
    getReport();
  }, [vehicleId,villegeId,remarkId,materialId,supplierId,receiverId,userId, dateRange,statusValue,Charges,Sno]);

  return (
    !isRecordEdited ? <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Report Data</Card.Title>
                <Row style={{marginTop:'20px'}}>
                  <Col  md="3">
                      <Form.Group>
                      <Autocomplete
                        //value={vehicles.find((item)=>item.id==vehicleId)}
                        //defaultValue={vehicles.length>0? vehicles.find((item)=>item.id==28):vehicles[0]}
                        // value={vehicles.length>0? vehicles.find((item) => {
                        //   return item.id == 28;
                        // }): ''}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setVehicleId(newValue.id);
                          else
                            setVehicleId(null);
                        }}
                        //inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          //setInputValue(newInputValue);
                        }}
                        options={vehicles}
                        getOptionLabel={(option) => option.vehicle_number}
                        renderInput={(params) => <TextField {...params} label={settingConst?.vehicle} />}
                      />

                      </Form.Group>
                  </Col>
                  <Col  md="3">
                      <Form.Group>
                      <Autocomplete
                        //value={vehicles.find((item)=>item.id==vehicleId)}
                        //defaultValue={vehicles.find((item)=>item.id==vehicleId)}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setMaterialId(newValue.id);
                          else
                            setMaterialId(null);
                        }}
                        //inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          //setInputValue(newInputValue);
                        }}
                        options={materials}
                        getOptionLabel={(option) => option.material_name}
                        renderInput={(params) => <TextField {...params} label={settingConst?.material} />}
                      />

                      </Form.Group>
                    </Col>
                    <Col  md="3">
                      <Form.Group>
                      <Autocomplete
                        //value={vehicles.find((item)=>item.id==vehicleId)}
                        //defaultValue={vehicles.find((item)=>item.id==vehicleId)}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setSupplierId(newValue.id);
                          else
                          setSupplierId(null);
                        }}
                        //inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          //setInputValue(newInputValue);
                        }}
                        options={suppliers}
                        getOptionLabel={(option) => option.supplier_name}
                        renderInput={(params) => <TextField {...params} label={settingConst?.supplier} />}
                      />
                      </Form.Group>
                    </Col>
                    <Col  md="3">
                      <Form.Group>
                      <Autocomplete
                        //value={vehicles.find((item)=>item.id==vehicleId)}
                        //defaultValue={vehicles.find((item)=>item.id==vehicleId)}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setVillegeId(newValue.id);
                          else
                          setVillegeId(null);
                        }}
                        //inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          //setInputValue(newInputValue);
                        }}
                        options={villeges}
                        getOptionLabel={(option) => option.villege_name}
                        renderInput={(params) => <TextField {...params} label={settingConst?.villege} />}
                      />
                        {/* <label>Villege</label>
                        <select className="form-control form-select" aria-label="Default select example" onChange={handleVillegeChange}>
                        <option value=''></option>
                        {villeges.map((villege) => <option key={villege.id} value={villege.id}>{villege.villege_name}</option>)}
                      </select> */}
                      </Form.Group>
                    </Col>
                    <Col  md="3">
                      <Form.Group>
                      <Autocomplete
                        //value={vehicles.find((item)=>item.id==vehicleId)}
                        //defaultValue={vehicles.find((item)=>item.id==vehicleId)}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setReceiverId(newValue.id);
                          else
                          setReceiverId(null);
                        }}
                        //inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          //setInputValue(newInputValue);
                        }}
                        options={receivers}
                        getOptionLabel={(option) => option.receiver_name}
                        renderInput={(params) => <TextField {...params} label={settingConst?.receiver} />}
                      />
                        {/* <label>Receiver</label>
                        <select className="form-control form-select" aria-label="Default select example" onChange={handleReceiverChange}>
                        <option value=''></option>
                        {receivers.map((receiver) => <option key={receiver.id} value={receiver.id}>{receiver.receiver_name}</option>)}
                      </select> */}
                      </Form.Group>
                    </Col>
                    <Col  md="3">
                      <Form.Group>
                      <Autocomplete
                        //value={vehicles.find((item)=>item.id==vehicleId)}
                        //defaultValue={vehicles.find((item)=>item.id==vehicleId)}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setRemarkId(newValue.id);
                          else
                          setRemarkId(null);
                        }}
                        //inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          //setInputValue(newInputValue);
                        }}
                        options={remarks}
                        getOptionLabel={(option) => option.remark}
                        renderInput={(params) => <TextField {...params} label={settingConst?.remark} />}
                      />
                        {/* <label>Remark</label>
                        <select className="form-control form-select" aria-label="Default select example" onChange={handleRemarkChange}>
                        <option value=''></option>
                        {remarks.map((remark) => <option key={remark.id} value={remark.id}>{remark.remark}</option>)}
                      </select> */}
                      </Form.Group>
                    </Col>
                    {localStorage.getItem('privilege') === "ADMIN" ? <Col  md="3">
                      <Form.Group>
                      <Autocomplete
                        //value={vehicles.find((item)=>item.id==vehicleId)}
                        //defaultValue={vehicles.find((item)=>item.id==vehicleId)}
                        onChange={(event, newValue) => {
                          //setValue(newValue);
                          console.log(newValue);
                          if(newValue)
                            setuserId(newValue.id);
                          else
                            setuserId(null);
                        }}
                        //inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          console.log(newInputValue);
                          //setInputValue(newInputValue);
                        }}
                        options={users}
                        getOptionLabel={(option) => option.email}
                        renderInput={(params) => <TextField {...params} label="Users" />}
                      />
                        {/* <label>Remark</label>
                        <select className="form-control form-select" aria-label="Default select example" onChange={handleRemarkChange}>
                        <option value=''></option>
                        {remarks.map((remark) => <option key={remark.id} value={remark.id}>{remark.remark}</option>)}
                      </select> */}
                      </Form.Group>
                    </Col> : null}
                </Row>
                <Row>
                  <Col  md="3">
                    <Form.Group>
                      <DateRangePicker
                        format="yyyy-MM-dd"
                        placeholder="Select Date Range"
                        appearance="default"
                        style={{ width: 300, marginTop:'1em' }}
                        onChange={handleDateRangeChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="3" style={{marginTop:'12px'}}>
                       <select className="form-control form-select" 
                                    aria-label="Default select example" 
                                    value={statusValue} 
                                    onChange={(e)=>{handleStatus(e)}}> 
                                      <option  value="pending">PENDING</option>
                                      <option  value="completed">COMPLETED</option>
                                    </select>
                  </Col>
                  <Col md="3" style={{marginTop:'12px'}}>
                      <Form.Group>
                          
                            <Form.Control
                              //ref={charges}
                              placeholder="Charges"
                              type="text"
                              onChange={handleCharges}
                            ></Form.Control>
                      </Form.Group>
                  </Col>
                  <Col md="3" style={{marginTop:'12px'}}>
                      <Form.Group>
                         
                            <Form.Control
                             // ref={charges}
                              placeholder="SNo"
                              type="text"
                              onChange={handleSno}
                            ></Form.Control>
                      </Form.Group>
                  </Col>
                </Row>
                <Row style={{marginTop:'20px'}}>
                   <div className="col-auto">
                        <button  className="btn btn-warning mb-2" onClick={() => handleEditReport()}>Edit</button>
                   </div>
                   <div>
                        <button  className="btn btn-danger mb-2" onClick={() => handleDeleteReport()}>DELETE</button>
                   </div>
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">

                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          className="border-0"
                          checked={MasterChecked}
                          id="mastercheck"
                          onChange={(e) => onMasterCheck(e)}
                        />
                    </th>
                      <th className="border-0">Sno</th>
                      <th className="border-0">Charges</th>
                      <th className="border-0">{settingConst?.vehicle}</th>
                      <th className="border-0">{settingConst?.supplier}</th>
                      <th className="border-0">{settingConst?.receiver}</th>
                      <th className="border-0">{settingConst?.material}</th>
                      <th className="border-0">{settingConst?.villege}</th>
                      <th className="border-0">{settingConst?.remark}</th>
                      {/* <th className="border-0">Gross Weight</th>
                      <th className="border-0">Tare Weight</th>
                      <th className="border-0">Net Weight</th> */}

                    </tr>
                  </thead>
                  <tbody>
                    {
                      reports.map((ele, index) => {
                        return (

                            <tr key={ele.id} >
                              <td scope="row">
                                <input
                                  type="checkbox"
                                  checked={ele.selected}
                                  className="border-0"
                                  id="rowcheck{ele.id}"
                                  onChange={(e) => onItemCheck(e, ele)}
                                />
                              </td>
                              <td>{ele.id}</td>
                              <td>{ele.charges}</td>
                              <td>{ele.vehicle.vehicle_number}</td>
                              <td>{ele.supplier.supplier_name}</td>
                              <td>{ele.receiver.receiver_name}</td>
                              <td>{ele.material.material_name}</td>
                              <td>{ele.villege.villege_name}</td>
                              <td>{ele.remark.remark}</td>

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
    </> : <ReportEdit reportId={SelectedList[0].id}  parentCallback = {handleCallback}></ReportEdit>
  );
}

export default ReportList;
