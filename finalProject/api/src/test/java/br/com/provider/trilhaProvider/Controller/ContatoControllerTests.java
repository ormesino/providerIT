/* package br.com.provider.trilhaProvider.Controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.time.LocalDate;
import static org.hamcrest.core.Is.is;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.provider.trilhaProvider.acompanhamento.Controller.V1.ClientController;
import br.com.provider.trilhaProvider.acompanhamento.DTO.ClientDTO;
import br.com.provider.trilhaProvider.acompanhamento.service.ClientService;

@WebMvcTest(ClientController.class)
public class ContatoControllerTests {

  @MockBean
  private ClientService gestorService;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  public void testCreategestorPost() throws Exception {

    long id = 1L;

    ContatoDto contato = new ContatoDto();

    contato.setIdGestor(1);

    contato.setIdBCP(1);

    contato.setNomeGestor("contato x");

    contato.setDataAdmissao(new Date());

    when(gestorService.GetGestorID(id)).thenReturn(null);
    when(gestorService.save(any(ContatoDto.class))).thenReturn(contato);

    mockMvc.perform(post("/contatos").contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(contato)))
        .andExpect(status().isCreated())
        .andDo(print());
  }

  @Test
  public void testCreategestorPut() throws Exception {

    long id = 1L;

    ContatoDto contato = new ContatoDto();

    contato.setIdGestor(1);

    contato.setIdBCP(1);

    contato.setNomeGestor("contato x");

    contato.setDataAdmissao(new Date());

    when(gestorService.GetGestorID(id)).thenReturn(null);
    when(gestorService.save(any(ContatoDto.class))).thenReturn(contato);

    mockMvc.perform(put("/contatos/{id}", id)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(contato)))
        .andExpect(status().isOk())
        .andDo(print());

  }

  @Test
  public void testCreategestorGet() throws Exception {

    long id = 1L;

    ContatoDto contato = new ContatoDto();

    contato.setIdGestor(1);

    contato.setIdBCP(1);

    contato.setNomeGestor("contato x");

    contato.setDataAdmissao(java.sql.Date.valueOf(LocalDate.now()));

    System.out.println("Today is : " + contato.getDataAdmissao());

    when(gestorService.GetGestorID(id)).thenReturn(contato);
    mockMvc.perform(get("/contatos/{id}", id))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.idGestor").value(id))
        .andExpect(jsonPath("$.nomeGestor").value(contato.getNomeGestor()))
        .andExpect(jsonPath("$.dataAdmissao", is(LocalDate.now().toString())))
        .andDo(print());
  }

  @Test
  public void testCreategestorGetAll() throws Exception {

    List<ContatoDto> gestorres = new ArrayList<>();

    ContatoDto contato = new ContatoDto();
    contato.setIdGestor(1);
    contato.setIdBCP(1);
    contato.setNomeGestor("contato x");
    contato.setDataAdmissao(java.sql.Date.valueOf(LocalDate.now()));

    ContatoDto gestor2 = new ContatoDto();
    gestor2.setIdGestor(2);
    gestor2.setIdBCP(2);
    gestor2.setNomeGestor("contato y");
    gestor2.setDataAdmissao(java.sql.Date.valueOf(LocalDate.now()));

    gestorres.add(contato);
    gestorres.add(gestor2);

    System.out.println("Today is : " + contato.getDataAdmissao());

    when(gestorService.GetAll()).thenReturn(gestorres);
    mockMvc.perform(get("/contatos"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].idBCP").value(contato.getIdBCP()))
        .andExpect(jsonPath("$[0].idGestor").value(contato.getIdGestor()))
        .andExpect(jsonPath("$[0].nomeGestor").value(contato.getNomeGestor()))
        .andExpect(jsonPath("$[0].dataAdmissao", is(LocalDate.now().toString())))

        .andExpect(jsonPath("$[1].idBCP").value(gestor2.getIdBCP()))
        .andExpect(jsonPath("$[1].idGestor").value(gestor2.getIdGestor()))
        .andExpect(jsonPath("$[1].nomeGestor").value(gestor2.getNomeGestor()))
        .andExpect(jsonPath("$[1].dataAdmissao", is(LocalDate.now().toString())))
        .andDo(print());
  }

  @Test
     public void testCreategestorGetAllNull() throws Exception {
     when(gestorService.GetAll()).thenReturn(null);
     mockMvc.perform(get("/contatos"))
     .andExpect(status().is5xxServerError())
     .andDo(print());
     }

  @Test
  public void testCreategestorGetNull() throws Exception {

    long id = 1L;

    when(gestorService.GetGestorID(id)).thenReturn(null);
    mockMvc.perform(get("/contatos/{id}", id))
        .andExpect(status().isNoContent())
        .andDo(print());
  }

  @Test
     public void testCreategestorPostNull() throws Exception {

     when(gestorService.save(any(ContatoDto.class))).thenReturn(null);

     mockMvc.perform(post("/contatos").contentType(MediaType.APPLICATION_JSON)
     .content(objectMapper.writeValueAsString(null)))
     .andExpect(status().is4xxClientError())
     .andDo(print());
     }

  @Test
     public void testCreategestorPutNull() throws Exception {

     when(gestorService.save(any(ContatoDto.class))).thenReturn(null);

     mockMvc.perform(put("/contatos/{id}", 1)
     .contentType(MediaType.APPLICATION_JSON)
     .content(objectMapper.writeValueAsString(null)))
     .andExpect(status().is4xxClientError())
     .andDo(print());

     }

  @Test
  public void testCreategestorPutException() throws Exception {

    long id = 1L;
    RuntimeException error = new RuntimeException("Hello");
    when(gestorService.GetGestorID(id)).thenReturn(null)
        .thenThrow(error);
    when(gestorService.save(any(ContatoDto.class))).thenThrow(error);

    when(gestorService.updateById(new ContatoDto(), id)).thenThrow(error);
    doThrow(new Exception()).when(gestorService.save(any(GestorDto.class)));

    mockMvc.perform(put("/contatos/{id}", 1)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(null)))
        .andExpect(status().is4xxClientError())
        .andDo(print());
  }
}
 */