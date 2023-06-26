package br.com.provider.trilhaProvider.acompanhamento.DTO;

import java.util.Date;

import lombok.Data;

@Data
public class ClientDTO {

  private Long id;
  private String fullName;
  private Date birthDate;
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

  /* public ClientDTO(Long id, String fullName, Date birthDate, String phone, String gender, String pronoun, String optionalGender, String cpf, String cep, 
                  String street, String num, String compl, String neighbourhood, String city, String uf) {
    this.id = id;
    this.fullName = fullName;
    this.birthDate = birthDate;
    this.phone = phone;
    this.gender = gender;
    this.pronoun = pronoun;
    this.optionalGender = optionalGender;
    this.cpf = cpf;
    this.cep = cep;
    this.street = street;
    this.num = num;
    this.compl = compl;
    this.neighbourhood = neighbourhood;
    this.city = city;
    this.uf = uf;
  }

  public ClientDTO(Client entity) {
    this.id = entity.getId();
    this.fullName = entity.getFullName();
    this.birthDate = entity.getBirthDate();
    this.phone = entity.getPhone();
    this.gender = entity.getGender();
    this.pronoun = entity.getPronoun();
    this.optionalGender = entity.getOptionalGender();
    this.cpf = entity.getCpf();
    this.cep = entity.getCep();
    this.street = entity.getStreet();
    this.num = entity.getNum();
    this.compl= entity.getCompl();
    this.neighbourhood = entity.getNeighbourhood();
    this.city = entity.getCity();
    this.uf = entity.getUf();
  } */
}
