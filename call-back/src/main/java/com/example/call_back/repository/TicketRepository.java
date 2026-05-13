
package com.example.call_back.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.call_back.entity.Ticket;
import java.util.List;
import com.example.call_back.enums.Status;  


public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByStatus(Status status);
}
