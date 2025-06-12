import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './gridForm.scss'

function HandleSubmit() {

}

function GridForm(props) {

    function addItem() {
        // props.setFormState("HNEW")
        props.setFormState(`HNEW`)
    }

    function cancelOperation() {
        props.setFormState(`HBASE`)
    }

    function cancelNew() {
        props.setFormState(`CANCELNEW`)
    }

    function setDelState() {
        props.setFormState(`HDEL`)
    }

    function delRow() {
        props.setFormState(`HDEL2`)
    }

    return (
        <Form onSubmit={HandleSubmit()}>
            <Row className={`rowbase ${props.formState}`}>
                <Col md={2} className="gridformbtnrow">
                    <Button id="gridbtnnew"
                        variant="outline-secondary"
                        size="lg"
                        onClick={() => addItem(undefined)}
                    >Új adat</Button>
                    <Button
                        id="gridbtndel"
                        variant="outline-danger"
                        size="lg"
                        onClick={() => setDelState(undefined)}
                    >Törlés</Button>
                </Col>
                <Col md={10}>
                </Col>
            </Row>
            <Row className={`rowedit ${props.formState}`}>
                <Col md={2} className="gridformbtnrow">
                    <Button
                        id="gridbtncancel"
                        variant="outline-secondary"
                        size="lg"
                        onClick={() => cancelNew(undefined)}
                    >Mégsem</Button>
                </Col>
                <Col md={10}>
                </Col>
            </Row>
            <Row className={`rowdel ${props.formState}`}>
                <Col md={2} className="gridformbtnrow">
                    <Button
                        id="gridbtncancel"
                        variant="outline-secondary"
                        size="lg"
                        onClick={() => cancelOperation(undefined)}
                    >Mégsem</Button>
                    <Button
                        id="gridbtndel2"
                        variant="outline-danger"
                        size="lg"
                        onClick={() => delRow(undefined)}
                    >Törlés</Button>
                </Col>

                <Col md={10}>
                </Col>
            </Row>
        </Form>
    )
}

export default GridForm;