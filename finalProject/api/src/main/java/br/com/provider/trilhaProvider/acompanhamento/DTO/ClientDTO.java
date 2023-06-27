package br.com.provider.trilhaProvider.acompanhamento.DTO;

import lombok.Data;

@Data
public class ClientDTO {

  private Long id;
  private String name;
  private Long birthDate;
  private String strDate;
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
  private String state;
}
