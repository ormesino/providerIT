package br.com.provider.trilhaProvider.acompanhamento.Models;

import java.io.Serializable;
import java.util.Date;

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
  @Column(name = "full_name")
  private String fullName;

  @NotNull
  @Column(name = "birth_date")
  private Date birthDate;

  @NotNull
  private String phone;

  @NotNull
  private String gender;

  private String pronoun;

  @Column(name = "optional_gender")
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
  private String uf;
}

/* @Data
@Entity
@Table(name = "tb_user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(name = "full_name")
    private String fullName;

    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    private String hash;

    @NotNull
    private String salt;
} */