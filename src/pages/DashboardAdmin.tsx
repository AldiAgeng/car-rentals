import { Button, Col, Row } from "react-bootstrap";
import { HeaderBar } from "../components"
import { CardCarsDashboard } from "../components"
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function DashboardAdmin() {

  const [cars, setCars] = useState([])
  const [plate, setPlate] = useState('')
  const [manufacture, setManufacture] = useState('')
  const [model, setModel] = useState('')
  const [image, setImage] = useState(null)
  const [rentPerDay, setRentPerDay] = useState('')
  const [capacity, setCapacity] = useState('')
  const [description, setDescription] = useState('')
  const [avaliableAt, setAvaliableAt] = useState('')
  const [transmission, setTransmission] = useState('')
  const [available, setAvailable] = useState('')
  const [type, setType] = useState('')
  const [year, setYear] = useState('')
  const [options, setOptions] = useState('')
  const [specs, setSpecs] = useState('')

  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const listCars = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/cars`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((response) => {
      setCars(response.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }



  const handleSubmit = () => {
    const form = new FormData();
    form.append("plate", plate);
    form.append("manufacture", manufacture);
    form.append("model", model);
    form.append("image", image);
    form.append("rent_per_day", rentPerDay);
    form.append("capacity", capacity);
    form.append("description", description);
    form.append("available_at", avaliableAt);
    form.append("transmission", transmission);
    form.append("available", available);
    form.append("type", type);
    form.append("year", year);
    form.append("options", JSON.stringify(options));
    form.append("specs", JSON.stringify(specs));

    axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/cars`, form, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      listCars();
      handleClose();
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    listCars();
  }, [])

  return (
    <div className="container-fluid">
      <HeaderBar/>
      <Row>
        <Col className="d-flex mt-3">
          <Button variant="primary" onClick={handleShow}>
          + Add Car
          </Button>
        </Col>
      </Row>


      {/* <Row>
        <Col md={3}>
          <Form>
          <Form.Group controlId="formFile" className="mb-3 mt-3">
            <Form.Control type="text"  placeholder="Search"/>
          </Form.Group>
          </Form>
        </Col>
      </Row> */}
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cars</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Plate</Form.Label>
                <Form.Control
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  type="text"
                  placeholder="Z-123-ABC"
                  autoFocus
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Manufacture</Form.Label>
                  <Form.Control
                    value={manufacture}
                    onChange={(e) => setManufacture(e.target.value)}
                    type="text"
                    placeholder="Toyota"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    type="text"
                    placeholder="Corolla"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" size="sm" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.files[0])} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                  <Form.Label>Rent Per Day</Form.Label>
                  <Form.Control
                    value={rentPerDay}
                    onChange={(e) => setRentPerDay(e.target.value)}
                    type="number"
                    placeholder="10000"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    type="number"
                    placeholder="10000"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea7">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                <Form.Label>Available At</Form.Label>
                <Form.Control type="date" value={avaliableAt} onChange={(e) => setAvaliableAt(e.target.value)}  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
                  <Form.Label>Transmission</Form.Label>
                  <Form.Control
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    type="text"
                    placeholder="Manual / Automatic"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                  <Form.Label>Available</Form.Label>
                  <Form.Control
                    value={available}
                    onChange={(e) => setAvailable(e.target.value)}
                    type="text"
                    placeholder="Sedan"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    type="text"
                    placeholder="Type"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    type="text"
                    placeholder="Sedan"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput13">
                  <Form.Label>Options</Form.Label>
                  <Form.Control
                    value={options }
                    onChange={(e) => setOptions(e.target.value)}
                    type="text"
                    placeholder="Sedan, Bla, bla"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput14">
                  <Form.Label>Specs</Form.Label>
                  <Form.Control
                    value={specs}
                    onChange={(e) => setSpecs(e.target.value)}
                    type="text"
                    placeholder="Bla, bla, bla"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      <div className="container mt-3">
        <CardCarsDashboard cars={cars} />
      </div>
      

    </div>
  )
}

export default DashboardAdmin