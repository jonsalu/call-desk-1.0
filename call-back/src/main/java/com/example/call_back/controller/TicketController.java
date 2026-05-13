package com.example.call_back.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;




import com.example.call_back.entity.Ticket;
import com.example.call_back.service.TicketService;
import com.example.call_back.enums.Status;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<Ticket> listarTickets() {
        return ticketService.listarTickets();
    }

    @PostMapping
    public Ticket criarTicket(@RequestBody Ticket ticket) {
        return ticketService.criarTicket(ticket);
    }

    @PutMapping("/{id}/status")
    public Ticket atualizarStatus(
        @PathVariable Long id,
        @RequestParam Status status) {

        return ticketService.atualizarStatus(id, status);
    }

    @GetMapping("/status")
    public List<Ticket> listarPorStatus(@RequestParam Status status) {
        return ticketService.listarPorStatus(status);
    }

    @DeleteMapping("/{id}")
    public void deletarTicket(@PathVariable Long id) {
        ticketService.deletarTicket(id);
    }
}
