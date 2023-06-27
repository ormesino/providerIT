package br.com.provider.trilhaProvider.acompanhamento.Controller.V1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.provider.trilhaProvider.acompanhamento.DTO.ClientDTO;
import br.com.provider.trilhaProvider.acompanhamento.service.ClientService;

@RestController
@RequestMapping("/clients")
public class ClientController {

  @Autowired
  private ClientService clientService;

  @CrossOrigin
  @GetMapping("")
  public ResponseEntity<List<ClientDTO>> findAll() {
    try {
      List<ClientDTO> clients = clientService.findAll();
      if (clients.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(clients, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @CrossOrigin
  @GetMapping("/{id}")
  public ResponseEntity<ClientDTO> findById(@PathVariable("id") Long id) {
    try {
      ClientDTO client = clientService.findById(id);
      if (client == null) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(client, HttpStatus.OK);
    } catch (Exception e) {
      // return error message
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @CrossOrigin
  @GetMapping("findByName/{clientName}")
  public ResponseEntity<List<ClientDTO>> findByName(@PathVariable String clientName) {
    try {
      List<ClientDTO> clients = clientService.findByName(clientName);
      return new ResponseEntity<>(clients, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
  }

  @CrossOrigin
  @PostMapping("")
  public ResponseEntity<ClientDTO> create(@RequestBody ClientDTO client) {
    try {
      ClientDTO savedClient = clientService.create(client);
      return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @CrossOrigin
  @PutMapping("/{id}")
  public ResponseEntity<ClientDTO> update(@RequestBody ClientDTO clientDTO, @PathVariable("id") Long id) {
    try {
      ClientDTO clientUpdated = clientService.update(clientDTO, id);
      if (clientUpdated == null) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(clientUpdated, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @CrossOrigin
  @DeleteMapping("/{id}")
  public ResponseEntity<ClientDTO> delete(@PathVariable Long id) {
    clientService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
