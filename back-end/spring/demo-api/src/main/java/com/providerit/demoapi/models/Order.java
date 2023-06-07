package com.providerit.demoapi.models;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Order {
  private Integer id;
  private Client cliente;
  private LocalDate orderDate;
  private BigDecimal price;

  public Client getCliente() {
    return cliente;
  }

  public Integer getId() {
    return id;
  }

  public LocalDate getOrderDate() {
    return orderDate;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setCliente(Client cliente) {
    this.cliente = cliente;
  }
  
  public void setId(Integer id) {
    this.id = id;
  }

  public void setOrderDate(LocalDate orderDate) {
    this.orderDate = orderDate;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }
}
