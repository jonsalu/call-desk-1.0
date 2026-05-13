import './FormPage.css'

import { useState } from "react";

const baseURL = "http://localhost:8080/tickets";


const FormPage = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [nomeSolicitante, setNomeSolicitante] = useState("");
    const [setor, setSetor] = useState("");
    const [prioridade, setPrioridade] = useState("MEDIA");

    // Criar ticket
    const criarTicket = async () => {
        if (!titulo || !descricao || !nomeSolicitante || !setor) return;

        await fetch(baseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                titulo,
                descricao,
                nomeSolicitante,
                setor,
                prioridade,
                status: "ABERTO"
            }),
        });

        setTitulo("");
        setDescricao("");
        setNomeSolicitante("");
        setSetor("");
        setPrioridade("MEDIA");
        // Note: listarTickets() removido, pois agora está no ListTicket
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h1>Criar Ticket</h1>
                <div className="form-group">
                    <input
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Nome do Solicitante"
                        value={nomeSolicitante}
                        onChange={(e) => setNomeSolicitante(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Setor"
                        value={setor}
                        onChange={(e) => setSetor(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <select
                        value={prioridade}
                        onChange={(e) => setPrioridade(e.target.value)}
                        className="priority-select"
                    >
                        <option value="BAIXA">Baixa</option>
                        <option value="MEDIA">Média</option>
                        <option value="ALTA">Alta</option>
                    </select>
                </div>
                <button className="create-btn" onClick={criarTicket}>Criar Ticket</button>
            </div>
        </div>
    );
};

export default FormPage;