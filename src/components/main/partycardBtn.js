import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import calendarimg from "./chang-duong-Sj0iMtq_Z4w-unsplash.jpg";
import backmonth from "./img/backmonth.png";
function PartycardBtn() {
  return (
    <>
      <Card style={{ height: "300px" }}>
        <Card.Img variant="top" src={calendarimg} style={{ height: "50%" }} />
        <Card.Body style={{ height: "50%" }}>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ height: "300px" }}>
        <Card.Img variant="top" src={calendarimg} style={{ height: "50%" }} />
        <Card.Body style={{ height: "50%" }}>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ height: "300px" }}>
        <Card.Img variant="top" src={calendarimg} style={{ height: "50%" }} />
        <Card.Body style={{ height: "50%" }}>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ height: "300px" }}>
        <Card.Img variant="top" src={calendarimg} style={{ height: "50%" }} />
        <Card.Body style={{ height: "50%" }}>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default PartycardBtn;
