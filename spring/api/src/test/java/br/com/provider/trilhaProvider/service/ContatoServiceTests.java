/* package br.com.provider.trilhaProvider.service;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import br.com.provider.trilhaProvider.acompanhamento.DTO.ClientDTO;
import br.com.provider.trilhaProvider.acompanhamento.Models.Client;
import br.com.provider.trilhaProvider.acompanhamento.Repository.ClientRepository;
import br.com.provider.trilhaProvider.acompanhamento.service.ClientService;

public class ContatoServiceTests {

  private ClientService gestorService;

  @Mock
  private ClientRepository gestorRepository;

  @Before
  public void setupMock() {

    MockitoAnnotations.initMocks(this);
    gestorService = new ClientService();
    gestorService.setContatoRepository(gestorRepository);
  }

  private Client criarGestorGet(Long id) {
    Client contato = new Client();

    contato.setId(id);
    contato.setNomeContato("Nome");
    contato.setDataAniversario(new Date());

    return contato;
  }

  private ClientDTO criarDto(Client contato) {

    ClientDTO retorno = new ClientDTO();

    retorno.setId_Contato(contato.getId());
    retorno.setNomeContato(contato.getNomeContato());
    retorno.setDataAniversario(contato.getDataAniversario());

    return retorno;
  }

  @Test
  public void testGetAllGestor() {

    List<Client> contatos = new ArrayList<>();

    contatos.add(criarGestorGet(1L));
    contatos.add(criarGestorGet(2L));

    when(gestorRepository.findAll()).thenReturn(contatos);
    List<ClientDTO> retornoContatos = gestorService.GetAll();

    assertTrue("A lista não pode ser nula: ", retornoContatos.size() > 0);

    assertTrue("Id não pode ser nulo: ", retornoContatos.get(0).getId_Contato() > 0);

    assertTrue("Nome do contato não pode ser nulo: : ", retornoContatos.get(0)
        .getNomeContato().equals(contatos.get(0).getNomeContato()));

    assertTrue("Data de admição não pode ser nulo: ", retornoContatos.get(0).getDataAniversario()
        .equals(contatos.get(0).getDataAniversario()));

  }
}
 */