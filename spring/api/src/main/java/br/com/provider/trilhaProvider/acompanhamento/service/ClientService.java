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
    List<ClientDTO> clients = convertListToDTO(clientRepository.findByNameClient(clientName));
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
      obj.setFullName(client.getFullName());
      obj.setBirthDate(client.getBirthDate());
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
      obj.setUf(client.getUf());
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
    temp.setFullName(clientDTO.getFullName());
    temp.setBirthDate(clientDTO.getBirthDate());
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
    temp.setUf(clientDTO.getUf());
    return temp;
  }

  private ClientDTO convertClientDTO(Client client) {
    ClientDTO temp = new ClientDTO();
    temp.setId(client.getId());
    temp.setFullName(client.getFullName());
    temp.setBirthDate(client.getBirthDate());
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
    temp.setUf(client.getUf());
    return temp;
  }

  private List<ClientDTO> convertListToDTO(List<Client> client) {
    return client.stream().map(t -> convertClientDTO(t)).collect(Collectors.toList());
  }

  /*
   * @Autowired
   * ClientRepository clientRepository;
   * 
   * @Transactional
   * public ClientDTO create(ClientDTO dto) {
   * Client objClient = new Client();
   * objClient.setId(dto.getId());
   * objClient.setFullName(dto.getFullName());
   * objClient.setBirthDate(dto.getBirthDate());
   * objClient.setPhone(dto.getPhone());
   * objClient.setGender(dto.getGender());
   * objClient.setPronoun(dto.getPronoun());
   * objClient.setOptionalGender(dto.getOptionalGender());
   * objClient.setCpf(dto.getCpf());
   * objClient.setCep(dto.getCep());
   * objClient.setStreet(dto.getStreet());
   * objClient.setNum(dto.getNum());
   * objClient.setCompl(dto.getCompl());
   * objClient.setNeighbourhood(dto.getNeighbourhood());
   * objClient.setCity(dto.getCity());
   * objClient.setUf(dto.getUf());
   * objClient = clientRepository.save(objClient);
   * return new ClientDTO(objClient);
   * }
   * 
   * @Transactional
   * public List<ClientDTO> findAll() {
   * List<Client> list = clientRepository.findAll();
   * List<ClientDTO> listDTO = list.stream().map(client -> new
   * ClientDTO(client)).collect(Collectors.toList());
   * return listDTO;
   * }
   * 
   * @Transactional
   * public ClientDTO findById(Long id) {
   * Optional<Client> optClient = clientRepository.findById(id);
   * Client client = optClient.orElseThrow(() -> new
   * ResourceNotFoundException("Client not found"));
   * return new ClientDTO(client);
   * }
   * 
   * @Transactional
   * public ClientDTO update(Long id, ClientDTO dto) {
   * try {
   * clientRepository.findById(id);
   * Client objClient = clientRepository.getReferenceById(id);
   * objClient.setId(dto.getId());
   * objClient.setFullName(dto.getFullName());
   * objClient.setBirthDate(dto.getBirthDate());
   * objClient.setPhone(dto.getPhone());
   * objClient.setGender(dto.getGender());
   * objClient.setPronoun(dto.getPronoun());
   * objClient.setOptionalGender(dto.getOptionalGender());
   * objClient.setCpf(dto.getCpf());
   * objClient.setCep(dto.getCep());
   * objClient.setStreet(dto.getStreet());
   * objClient.setNum(dto.getNum());
   * objClient.setCompl(dto.getCompl());
   * objClient.setNeighbourhood(dto.getNeighbourhood());
   * objClient.setCity(dto.getCity());
   * objClient.setUf(dto.getUf());
   * objClient = clientRepository.save(objClient);
   * return new ClientDTO(objClient);
   * }
   * catch (EntityNotFoundException e) {
   * throw new ResourceNotFoundException("Client not found.");
   * }
   * }
   * 
   * public void delete(Long id) {
   * try {
   * clientRepository.findById(id);
   * clientRepository.deleteById(id);
   * }
   * catch(EmptyResultDataAccessException e) {
   * throw new ResourceNotFoundException("Client not found.");
   * }
   * }
   */
}