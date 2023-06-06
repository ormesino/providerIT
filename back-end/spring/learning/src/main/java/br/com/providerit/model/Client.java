package br.com.providerit.model;

public class Client {
  private String name;
  private String cpf;

  public Client(String name, String cpf) {
    this.name = name;
    this.cpf = cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCpf() {
    return cpf;
  }

  public String getName() {
    return name;
  }
}
