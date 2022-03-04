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

export const EditarServico = (props) => {
    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    console.log(props);
    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const edtServico = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json",
        };

        await axios
            .put(api + "/atualizaservico/" + id, { id, nome, descricao }, { headers })
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
        const getServico = async () => {
            await axios
                .get(api + "/servico/" + id)
                .then((response) => {
                    setId(response.data.servico.id);
                    setNome(response.data.servico.nome);
                    setDescricao(response.data.servico.descricao);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.");
                });
        };
        getServico();
    }, [id]);

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Servico</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-servico" className="btn btn-outline-primary btn-sm">
                        Serviços
                    </Link>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente" className="btn btn-outline-primary btn-sm">
                        Clientes
                    </Link>
                </div>
                <div className="p-2">
                    <Link to="/listar-pedido" className="btn btn-outline-primary btn-sm">
                        Pedidos
                    </Link>
                </div>
            </div>
            <hr className="m-1" />
            {status.type === "error" ? (
                <Alert className="m-3" color="danger">
                    {status.message}
                </Alert>
            ) : (
                " "
            )}
            {status.type === "success" ? (
                <Alert className="m-3" color="success">
                    {status.message}
                </Alert>
            ) : (
                " "
            )}
            {status.type === "404" ? (
                <Alert className="m-3" color="danger">
                    {status.message}
                </Alert>
            ) : (
                ""
            )}

            <Form className="p-2" onSubmit={edtServico}>
                <FormGroup className="p-2">
                    <Label>Serviço ID:</Label>
                    <Input
                        type="number"
                        name="id"
                        disabled
                        placeholder="ID do Produto"
                        defaultValue={id}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Serviço:</Label>
                    <Input
                        type="text"
                        name="nome"
                        placeholder="Nome do Serviço"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Descrição:</Label>
                    <Input
                        type="text"
                        name="descricao"
                        placeholder="Descrição do Serviço"
                        defaultValue={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </FormGroup>
                <Button className="m-2" type="submit" outline color="success">
                    Salvar
                </Button>
            </Form>
        </Container>
    );
};