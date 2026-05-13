package com.example.call_back.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.call_back.entity.Ticket;
import com.example.call_back.repository.TicketRepository;
import com.example.call_back.enums.Status;



@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> listarTickets() {
        return ticketRepository.findAll();
    }

    public Ticket criarTicket(Ticket ticket) {
        ticket.setStatus(Status.ABERTO);
        ticket.setDataCriacao(LocalDateTime.now());
        return ticketRepository.save(ticket);
    }

    public Ticket atualizarStatus(Long id, Status status) {
        Ticket ticket = ticketRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Ticket não encontrado"));

        ticket.setStatus(status);

        return ticketRepository.save(ticket);
    }

    public List<Ticket> listarPorStatus(Status status) {
        return ticketRepository.findByStatus(status);
    }

    public void deletarTicket(Long id) {
        boolean existe = ticketRepository.existsById(id);
            if (!existe) {
                throw new RuntimeException("Ticket não encontrado");
            }
            ticketRepository.deleteById(id);
    }
}
