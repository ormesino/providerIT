package br.com.providerit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.providerit.model.Client;
import br.com.providerit.repository.ClientRepository;

@Service
public class ClientService {

  private ClientRepository repository;

  @Autowired
  public ClientService (ClientRepository clientRepository) {
    this.repository = clientRepository;
  }

  public boolean validateClient(Client client) {
    // Validação do cliente para registro
    return true;
  }

  public void saveClient(Client client) {
    boolean isValidated = validateClient(client);

    if (isValidated) {
      this.repository.createClient(client);
    }
  }
}
