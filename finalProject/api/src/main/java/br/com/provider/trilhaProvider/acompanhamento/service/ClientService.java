package br.com.provider.trilhaProvider.acompanhamento.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.provider.trilhaProvider.acompanhamento.DTO.ClientDTO;
import br.com.provider.trilhaProvider.acompanhamento.Models.Client;
import br.com.provider.trilhaProvider.acompanhamento.Repository.ClientRepository;

@Service
public class ClientService {

  @Autowired
  ClientRepository clientRepository;

  public void setContatoRepository(ClientRepository clientRepository) {
    this.clientRepository = clientRepository;
  }

  // GET
  public List<ClientDTO> findAll() {
    return convertListToDTO(clientRepository.findAll());
  }

  public ClientDTO findById(Long id) {
    Optional<Client> client = clientRepository.findById(id);
    if (client.isPresent()) {
      return convertClientDTO(client.get());
    }
    return null;
  }

  public List<ClientDTO> findByName(String clientName) throws Exception {
    List<ClientDTO> clients = convertListToDTO(clientRepository.findByName(clientName));
    if (clients.size() == 0)
      throw new Exception("NOT FOUND");
    return clients;
  }

  // CREATE & UPDATE
  public ClientDTO create(ClientDTO clientDTO) {
    Client client = convertClient(clientDTO);
    return convertClientDTO(clientRepository.save(client));
  }

  public ClientDTO update(ClientDTO client, Long id) {
    Optional<Client> temp = clientRepository.findById(id);
    if (temp.isPresent()) {
      Client obj = temp.get();
      obj.setName(client.getName());
      obj.setBirthDate(client.getBirthDate());
      obj.setStrDate(client.getStrDate());
      obj.setPhone(client.getPhone());
      obj.setGender(client.getGender());
      if (client.getPronoun() != null)
        obj.setPronoun(client.getPronoun());
      if (client.getOptionalGender() != null)
        obj.setOptionalGender(client.getOptionalGender());
      obj.setCpf(client.getCpf());
      obj.setCep(client.getCep());
      obj.setStreet(client.getStreet());
      obj.setNum(client.getNum());
      if (client.getCompl() != null)
        obj.setCompl(client.getCompl());
      obj.setNeighborhood(client.getNeighborhood());
      obj.setCity(client.getCity());
      obj.setState(client.getState());
      clientRepository.save(obj);
      return convertClientDTO(obj);
    }
    return null;
  }

  // DELETE
  public ClientDTO delete(Long id) {
    Optional<Client> temp = clientRepository.findById(id);
    if (temp.isPresent()) {
      Client obj = temp.get();
      clientRepository.delete(obj);
      return convertClientDTO(obj);
    }
    return null;
  }

  // CONVERTERS
  private Client convertClient(ClientDTO clientDTO) {
    Client temp = new Client();
    temp.setId(clientDTO.getId());
    temp.setName(clientDTO.getName());
    temp.setBirthDate(clientDTO.getBirthDate());
    temp.setStrDate(clientDTO.getStrDate());
    temp.setPhone(clientDTO.getPhone());
    temp.setGender(clientDTO.getGender());
    temp.setPronoun(clientDTO.getPronoun());
    temp.setOptionalGender(clientDTO.getOptionalGender());
    temp.setCpf(clientDTO.getCpf());
    temp.setCep(clientDTO.getCep());
    temp.setStreet(clientDTO.getStreet());
    temp.setNum(clientDTO.getNum());
    temp.setCompl(clientDTO.getCompl());
    temp.setNeighborhood(clientDTO.getNeighborhood());
    temp.setCity(clientDTO.getCity());
    temp.setState(clientDTO.getState());
    return temp;
  }

  private ClientDTO convertClientDTO(Client client) {
    ClientDTO temp = new ClientDTO();
    temp.setId(client.getId());
    temp.setName(client.getName());
    temp.setBirthDate(client.getBirthDate());
    temp.setStrDate(client.getStrDate());
    temp.setPhone(client.getPhone());
    temp.setGender(client.getGender());
    temp.setPronoun(client.getPronoun());
    temp.setOptionalGender(client.getOptionalGender());
    temp.setCpf(client.getCpf());
    temp.setCep(client.getCep());
    temp.setStreet(client.getStreet());
    temp.setNum(client.getNum());
    temp.setCompl(client.getCompl());
    temp.setNeighborhood(client.getNeighborhood());
    temp.setCity(client.getCity());
    temp.setState(client.getState());
    return temp;
  }

  private List<ClientDTO> convertListToDTO(List<Client> client) {
    return client.stream().map(t -> convertClientDTO(t)).collect(Collectors.toList());
  }
}