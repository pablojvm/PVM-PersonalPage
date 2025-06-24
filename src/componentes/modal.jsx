import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Contacts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <h4>Phone number</h4>
          <img src="/telephone.png" width="40px" />
        </div>
        <p>(+34) 611 46 32 15</p>
      </Modal.Body>
      <Modal.Body>
        <div style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <h4>Email</h4>
          <img src="/email.png" width="40px" />
        </div>
        <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSHxjQCvvdVVhwhXqNDhTWsvKGzhwPqQhkzPddslbdGXMdWrlHDZpwDjVnvSJvmmcfJkqNnH">
          pablo.villar.moron@gmail.com
        </a>
      </Modal.Body>
      <Modal.Body>
        <div style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <h4>LinkedIn</h4>
          <img src="/linkedin.png" width="40px" />
        </div>
        <a href="www.linkedin.com/in/pablo-villar-webdeveloper">
          Personal profile
        </a>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
