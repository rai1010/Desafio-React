import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarServico = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const getServicos = async () => {
        axios
            .get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API.");
            });
    };

    const apagarServico = async (idServico) => {
        console.log(idServico);

        const headers = {
            "Content-type": "application/json",
        };

        await axios
            .get(api + "/excluirservico/" + idServico, { headers })
            .then((response) => {
                console.log(response.data.error);
                getServicos();
            })
            .catch(() => {
                setStatus({
                    type: "error",
                    message: "Não foi possível conetar-se a API.",
                });
            });
    };

    useEffect(() => {
        getServicos();
    }, []);

    return (
        <Container>
            <div className="p-2">
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
            </div>
            <div className="d-flex">
                <div className="m-auto">
                    <h1>Visualizar Servicos</h1>
                </div>
                <div className="m-auto p-2">
                    <Link
                        to="/inserir-servico"
                        className="btn btn-outline-success btn-sm"
                    >
                        Cadastrar
                    </Link>
                </div>
            </div>
            <Table striped className="text-center">
                <thead>
                    <tr>
                        <th>Servico ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((servicos) => (
                        <tr key={servicos.id}>
                            <th>{servicos.id}</th>
                            <td>{servicos.nome}</td>
                            <td>{servicos.descricao}</td>
                            <td>
                                <Link
                                    to={"/editar-servico/" + servicos.id}
                                    className="m-1 btn btn-outline-warning btn-sm"
                                >
                                    Editar
                                </Link>

                                <span
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => apagarServico(servicos.id)}
                                >
                                    Excluir
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};