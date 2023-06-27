package br.com.provider.trilhaProvider.acompanhamento.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.provider.trilhaProvider.acompanhamento.Models.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

    List<Client> findByFullName(String fullName);
}
