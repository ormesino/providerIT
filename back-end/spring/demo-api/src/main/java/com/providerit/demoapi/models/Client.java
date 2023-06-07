package com.providerit.demoapi.models;

public class Client {
  private Integer id;
  private String fullName;

  public Client() {
  }

  public Client(String fullName) {
    this.fullName = fullName;
  }

  public Client(Integer id, String fullName) {
    this.id = id;
    this.fullName = fullName;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public Integer getId() {
    return id;
  }

  public String getFullName() {
    return fullName;
  }

  @Override
  public String toString() {
    return "Cliente { id = " + this.id + 
      ", nome = " + this.fullName + 
    " }";
  }
}
