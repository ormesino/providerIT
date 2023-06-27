package br.com.provider.trilhaProvider.acompanhamento.Models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
@Entity
@Table(name = "tb_client")
public class Client implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  private String name;

  @NotNull
  private Long birthDate;

  @NotNull
  private String strDate;

  @NotNull
  private String phone;

  @NotNull
  private String gender;

  private String pronoun;

  private String optionalGender;

  @NotNull
  @Column(unique = true)
  private String cpf;

  @NotNull
  private String cep;

  @NotNull
  private String street;

  @NotNull
  private String num;

  private String compl;

  @NotNull
  private String neighborhood;

  @NotNull
  private String city;

  @NotNull
  private String state;
}