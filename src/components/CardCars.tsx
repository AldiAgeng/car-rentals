import { BiCalendar, BiCar } from 'react-icons/bi';
import { Row, Col, Card, Button } from "react-bootstrap";
import { Cars } from '../interfaces/CarInterface';
export default function CardCars({ cars: cars }: { cars: Cars[] }) {
  return (
    <>
      <Row className="mt-5">
        {cars && cars.length === 0  ? (
          <Col>
            <p className="text-center">Tidak ada mobil yang tersedia.</p>
          </Col>
        ) : (
          cars &&
          cars?.length > 0 &&
          cars.map((car) => (
              <Col md={4} className="mb-3 d-flex justify-content-center" key={car.id}>
                <Card style={{ width: "333px" }}>
                  <Card.Img variant="top" src={car.image} style={{ maxHeight: "13rem" }} />
                  <Card.Body>
                  <Card.Title>
                      {car.manufacture} / {car.type}
                    </Card.Title>
                    <Card.Text>
                      <span className="fw-bold">Rp. {car.rent_per_day.toString()}</span>
                    </Card.Text>
                    <Card.Text>
                      <BiCalendar/> {car.capacity} Penumpang
                    </Card.Text>
                    <Card.Text>
                      <BiCar /> {car.plate}
                    </Card.Text>
                    <Card.Text>
                      <BiCalendar />Tahun {car.year}
                    </Card.Text>
                    <Button className="btn-light-green w-100">Pilih Mobil</Button>
                  </Card.Body>
                </Card>
              </Col>
          ))
        )}
      </Row>
    </>
  );
}
