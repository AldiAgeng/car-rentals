import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import CardCars from "./CardCars";


export default function FilterCars() {
  const [cars, setCars] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [avaliableAt, setAvaliableAt] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const handleAvaliableAt = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAvaliableAt(event.target.value);
  };

  const handlePickupTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setPickupTime(event.target.value);
  };

  const handleCapacity = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCapacity(event.target.value);
  };

  
  
  const handleSubmit = () => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_BASE_URL}/cars/public`);
    url.searchParams.append("capacityFilter", capacity);
    url.searchParams.append("dateFilter", `${avaliableAt}:${pickupTime}`);

    axios.get(url.href).then((response) => {
      setCars(response.data.data);
    }).catch((error) => {
      console.log(error);
    })
  };

  return (
    <div className="filter-cars">
      <Container>
        <Row className="mt-5 pt-5">
          <Col md className="d-flex justify-content-center">
            <Card>
              <Card.Body>
                <Row>
                  <Col md>
                    <label className="form-label col-form-label-sm">Tipe Driver</label>
                    <select className="form-select form-select-sm" id="tipe-driver" aria-label="Default select example">
                      <option disabled>Pilih Tipe Driver</option>
                      <option value="1">Dengan Sopir</option>
                      <option value="2">Tanpa Sopir (Lepas Kunci)</option>
                    </select>
                  </Col>
                  <Col md>
                    <label className="form-label col-form-label-sm">Tanggal</label>
                    <input type="date" onChange={handleAvaliableAt} defaultValue={avaliableAt} className="form-control form-control-sm" id="tanggal" required />
                  </Col>
                  <Col md>
                    <label className="form-label col-form-label-sm">Waktu Jemput</label>
                    <select defaultValue={pickupTime} onChange={handlePickupTime} className="form-select form-select-sm icon-rtl" id="waktu-jemput" required>
                      <option value="00:00:00">Pilih Waktu</option>
                      <option value="08:00:00">08.00 WIB</option>
                      <option value="09:00:00">09.00 WIB</option>
                      <option value="10:00:00">10.00 WIB</option>
                      <option value="11:00:00">11.00 WIB</option>
                      <option value="12:00:00">12.00 WIB</option>
                    </select>
                  </Col>
                  <Col md>
                    <label className="form-label col-form-label-sm">Jumlah Penumpang (opsional)</label>
                    <input type="number" className="form-control form-control-sm" id="jumlah-penumpang" onChange={handleCapacity} defaultValue={capacity} placeholder="Jumlah Penumpang" />
                  </Col>
                  <Col md={1} className="text-center">
                    <Button className="btn btn-sm btn-light-green mx-auto search-btn" id="btn-search" onClick={handleSubmit} type="submit">
                      Cari Mobil
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <CardCars cars={cars} />
      </Container>
    </div>
  );
}
