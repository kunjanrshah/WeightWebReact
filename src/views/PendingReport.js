import React, { useEffect, useState, useRef } from "react";
import { ApiService } from "services";
import { useHistory } from "react-router-dom";
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

function PendingReport() {
  const [settingConst,setsettingConst]=useState({});
  const baseUrl='weighing';
  const [reports, setReports] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [editedReportNo, setEditedReportNo] = useState(false);
  const formInput = useRef(null);
  const editRefs = useRef([]);
  const history = useHistory();

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

  let handleEdit = (id) => {
    history.push(`/admin/dashboard/${id}`);
  }

  async function getReport(){

    let url=`${baseUrl}?page=1&take=10&status=pending`;
    const data = await ApiService(`${url}`, 'GET', null);
    
    setReports(data);
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
  }, []);

  useEffect(() => {
    console.log("changed in variables");
    getReport();
   }, [vehicleId,villegeId,remarkId,materialId,supplierId,receiverId]);



  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Pending Weighing List</Card.Title>
               
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
               
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Sno</th>
                      <th className="border-0">Charges</th>
                      <th className="border-0">{settingConst?.vehicle}</th>
                      <th className="border-0">{settingConst?.supplier}</th>
                      <th className="border-0">{settingConst?.receiver}</th>
                      <th className="border-0">{settingConst?.material}</th>
                      <th className="border-0">{settingConst?.villege}</th>
                      <th className="border-0">{settingConst?.remark}</th>
                      <th className="border-0">Action</th>
                      {/*<th className="border-0">Tare Weight</th>
                      <th className="border-0">Net Weight</th> */}
                      
                    </tr>
                  </thead>
                  <tbody>
                    {
                      reports.map((ele, index) => {
                        return (
                          
                            <tr key={ele.id} >
                              <td>{ele.id}</td>
                              <td>{ele.charges}</td>
                              <td>{ele.vehicle.vehicle_number}</td>
                              <td>{ele.supplier.supplier_name}</td>
                              <td>{ele.receiver.receiver_name}</td>
                              <td>{ele.material.material_name}</td>
                              <td>{ele.villege.villege_name}</td>
                              <td>{ele.remark.remark}</td>
                              <td>
                                <button className="btn btn-sm btn-warning mb-2 mr-2" onClick={() => handleEdit(ele.id)}>EDIT</button>
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

export default PendingReport;
