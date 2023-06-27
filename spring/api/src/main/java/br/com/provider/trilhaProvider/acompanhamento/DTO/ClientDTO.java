package br.com.provider.trilhaProvider.acompanhamento.DTO;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ClientDTO {

  private Long id;
  private String fullName;
  private LocalDate birthDate;
  private String phone;
  private String gender;
  private String pronoun;
  private String optionalGender;
  private String cpf;
  private String cep;
  private String street;
  private String num;
  private String compl;
  private String neighborhood;
  private String city;
  private String uf;
}
