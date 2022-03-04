import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Alert,
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import { api } from "../../../config";

export const EditarPedido = (props) => {
    const [id, setId] = useState(props.match.params.id);
    const [dataPedido, setDataPedido] = useState("");
    const [ClienteId, setClienteId] = useState("");
    console.log(props);
    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const edtPedido = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json",
        };

        await axios
            .put(api + "/atualizapedido/" + id, { id, dataPedido, ClienteId }, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: "error",
                        message: response.data.message,
                    });
                } else {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                }
            })
            .catch(() => {
                setStatus({
                    type: "404",
                    message: "Sem conexão com a API.",
                });
            });
    };

    useEffect(() => {
        const getPedido = async () => {
            await axios
                .get(api + "/pedido/" + id)
                .then((response) => {
                    setId(response.data.pedido.id);
                    setDataPedido(response.data.pedido.dataPedido);
                    setClienteId(response.data.pedido.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.");
                });
        };
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link
                            to="/listar-pedido"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Pedidos
                        </Link>
                    </div>
                    <div className="p-2">
                        <Link
                            to="/listar-cliente"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Clientes
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />
                {status.type === "error" ? (
                    <Alert className="m-3" color="danger">{status.message}</Alert>
                ) : (
                    " "
                )}
                {status.type === "success" ? (
                    <Alert className="m-3" color="success">{status.message}</Alert>
                ) : (
                    " "
                )}

                <Form className="p-2" onSubmit={edtPedido}>
                    <FormGroup className="p-2">
                        <Label>ID Pedido:</Label>
                        <Input
                            type="number"
                            name="id"
                            placeholder="id do pedido"
                            disabled
                            defaultValue={id}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data do Pedido:</Label>
                        <Input
                            type="date"
                            name="dataPedido"
                            placeholder="data do pedido"
                            value={dataPedido}
                            onChange={(e) => setDataPedido(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cliente ID:</Label>
                        <Input
                            type="number"
                            name="ClienteId"
                            placeholder="id do cliente"
                            disabled
                            defaultValue={ClienteId}
                        />
                    </FormGroup>
                    <Button className="m-2" type="submit" outline color="success">
                        Salvar
                    </Button>
                </Form>
            </Container>
        </div>
    );
};