import { useEffect, useState } from "react";
import './ListTicket.css';

const baseURL = "http://localhost:8080/tickets";

const ListTicket = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Carregar tickets
    const listarTickets = async () => {
        const res = await fetch(baseURL);
        const data = await res.json();
        setTickets(data);
    };

    useEffect(() => {
        listarTickets();
    }, []);

    // Atualizar status
    const atualizarStatus = async (id, status) => {
        await fetch(`${baseURL}/${id}/status?status=${status}`, { method: "PUT" });
        listarTickets();
    };

    // Deletar ticket
    const deletarTicket = async (id) => {
        await fetch(`${baseURL}/${id}`, { method: "DELETE" });
        listarTickets();
    };

    // Abrir modal com detalhes
    const abrirModal = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    // Fechar modal
    const fecharModal = () => {
        setSelectedTicket(null);
        setIsModalOpen(false);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'ABERTO': return 'status-aberto';
            case 'EM_ANDAMENTO': return 'status-em_andamento';
            case 'FECHADO': return 'status-fechado';
            default: return '';
        }
    };

    return (
        <div className="list-container">
            <div className="list-header">
                <h1>Listagem de Tickets</h1>
            </div>
            <div className="tickets-grid">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-card">
                        <div className="ticket-info">
                            <div className="ticket-id">#{ticket.id}</div>
                            <div className="ticket-title">{ticket.titulo}</div>
                            <span className={`ticket-status ${getStatusClass(ticket.status)}`}>
                                {ticket.status}
                            </span>
                        </div>
                        <div className="ticket-actions">
                            <button
                                className="action-btn detail-btn"
                                onClick={() => abrirModal(ticket)}
                            >
                                Detalhe
                            </button>
                            <button
                                className="action-btn update-btn"
                                onClick={() => atualizarStatus(ticket.id, "EM_ANDAMENTO")}
                            >
                                Em Andamento
                            </button>
                            <button
                                className="action-btn delete-btn"
                                onClick={() => deletarTicket(ticket.id)}
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedTicket && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Detalhes do Ticket #{selectedTicket.id}</h2>
                            <button className="close-btn" onClick={fecharModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-row">
                                <span className="detail-label">Título:</span>
                                <span className="detail-value">{selectedTicket.titulo}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Descrição:</span>
                                <span className="detail-value">{selectedTicket.descricao}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Solicitante:</span>
                                <span className="detail-value">{selectedTicket.nomeSolicitante}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Setor:</span>
                                <span className="detail-value">{selectedTicket.setor}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Prioridade:</span>
                                <span className={`detail-value priority-${selectedTicket.prioridade?.toLowerCase()}`}>
                                    {selectedTicket.prioridade}
                                </span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Status:</span>
                                <span className={`detail-value status-${selectedTicket.status?.toLowerCase()}`}>
                                    {selectedTicket.status}
                                </span>
                            </div>
                            {selectedTicket.dataCriacao && (
                                <div className="detail-row">
                                    <span className="detail-label">Data de Criação:</span>
                                    <span className="detail-value">
                                        {new Date(selectedTicket.dataCriacao).toLocaleString('pt-BR')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListTicket;