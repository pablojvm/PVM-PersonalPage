import "./App.css";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import MyVerticallyCenteredModal from "./componentes/modal";

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  const [colSize, setColSize] = useState(3);
  const [colSize2, setColSize2] = useState(3);
  const [colSize3, setColSize3] = useState(3);

  return (
    <>
      <div id="cabecera">
        <div id="cabecera-1">
          <p>Hello!</p>
          <h1>I'm Pablo</h1>
          <h3>Junior Web Developer</h3>
        </div>
        <div id="cabecera-2">
          <img id="img-cabecera" src="/yo.png" />
        </div>
      </div>
      <div
        id="aboutme"
        style={{
          backgroundColor: "rgb(10, 8, 8)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src="/yofondo.png"
            width="150px"
            style={{
              border: "rgb(59, 53, 53) solid 5px",
              borderRadius: "10px",
              boxShadow: "-20px 20px 2px rgb(242, 182, 142)",
            }}
          />
        </div>
        <div>
          <h2>About me</h2>
          <p>
            I’m a Full Stack Web Developer with a strong foundation in modern
            technologies like JavaScript, React, Node.js, and MongoDB. After
            several years working in the hospitality and retail industries—where
            I developed key soft skills like communication, adaptability, and
            teamwork—I made a career shift into tech, driven by a passion for
            problem-solving and creating intuitive digital experiences. I'm
            currently focused on building dynamic, responsive web applications,
            and I’m always eager to keep learning and growing as a developer.
          </p>
          <Button
            id="button-1"
            className="mb-3"
            onClick={() => setModalShow(true)}
          >
            Contact Me!
          </Button>
          <Button
            id="button-2"
            variant="outline-primary"
            className="ms-3 mb-3"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/CV.pdf";
              link.download = "/PVM-CV.pdf";
              link.click();
            }}
          >
            Download CV
          </Button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#242424",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1 id="projects">Projects</h1>
        <p id="parra">
          Throughout my journey as a junior full stack developer, I’ve worked on
          several projects that showcase my technical skills, creativity, and
          problem-solving mindset. Each of these projects has helped me
          grow—from building intuitive user interfaces to managing backend logic
          and data flow. Below you’ll find three selected projects that reflect
          my ability to turn ideas into fully functional web applications using
          modern technologies like JavaScript, React, Node.js, MongoDB, and
          more.
        </p>
        <Row id="Row">
          <Col
            md={colSize}
            onClick={() =>
              window.open("https://mimusico.netlify.app/", "_blank")
            }
            onMouseEnter={() => setColSize(4)}
            onMouseLeave={() => setColSize(3)}
          >
            <Card
              className="text-white position-relative"
              style={{ height: "300px", overflow: "hidden" }}
            >
              <div
                className="w-100 h-100 position-absolute top-0 start-0"
                style={{
                  backgroundImage: `url('/captura1.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.7)",
                  zIndex: 0,
                }}
              />
              <div
                className="w-100 h-100 position-absolute top-0 start-0"
                style={{
                  backgroundColor: "rgba(85, 93, 247, 0.3)",
                  zIndex: 1,
                }}
              />
              <div
                className="position-relative h-100 d-flex flex-column justify-content-end p-3"
                style={{ zIndex: 2 }}
              >
                <h5 className="mb-2">MiMusico</h5>
                <p className="mb-1">
                  Plataforma de anuncios de instrumentos de segunda mano y
                  grupos de musica.
                </p>
                <small className="text-muted">
                  Última actualización: hace 3 minutos
                </small>
              </div>
            </Card>
          </Col>

          <Col
            md={colSize2}
            onClick={() =>
              window.open("https://go-gurl.netlify.app/", "_blank")
            }
            onMouseEnter={() => setColSize2(4)}
            onMouseLeave={() => setColSize2(3)}
          >
            <Card
              className="text-white position-relative"
              style={{ height: "300px", overflow: "hidden" }}
            >
              <div
                className="w-100 h-100 position-absolute top-0 start-0"
                style={{
                  backgroundImage: `url('/captura2.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.7)",
                  zIndex: 0,
                }}
              />
              <div
                className="w-100 h-100 position-absolute top-0 start-0"
                style={{
                  backgroundColor: "rgba(231, 59, 194, 0.3)",
                  zIndex: 1,
                }}
              />
              <div
                className="position-relative h-100 d-flex flex-column justify-content-end p-3"
                style={{ zIndex: 2 }}
              >
                <h5 className="mb-2">GoGurl!</h5>
                <p className="mb-1">
                  Wiki App de información de Drag Race España
                </p>
              </div>
            </Card>
          </Col>

          <Col
            md={colSize3}
            onClick={() =>
              window.open(
                "https://pablojvm.github.io/drag-for-the-crown/",
                "_blank"
              )
            }
            onMouseEnter={() => setColSize3(4)}
            onMouseLeave={() => setColSize3(3)}
          >
            <Card
              className="text-white position-relative"
              style={{ height: "300px", overflow: "hidden" }}
            >
              <div
                className="w-100 h-100 position-absolute top-0 start-0"
                style={{
                  backgroundImage: `url('/captura3.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.7)",
                  zIndex: 0,
                }}
              />
              <div
                className="w-100 h-100 position-absolute top-0 start-0"
                style={{
                  backgroundColor: "rgba(61, 207, 240, 0.3)",
                  zIndex: 1,
                }}
              />
              <div
                className="position-relative h-100 d-flex flex-column justify-content-end p-3"
                style={{ zIndex: 2 }}
              >
                <h5 className="mb-2">Drag for the Crown</h5>
                <p className="mb-1">Minijuego con temática Drag Queen</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default App;
