package com.providerit.demoapi.models;

import java.math.BigDecimal;

public class Product {
  private Integer id;
  private String description;
  private BigDecimal price;

  public void setDescription(String description) {
    this.description = description;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public String getDescription() {
    return description;
  }
  
  public Integer getId() {
    return id;
  }

  public BigDecimal getPrice() {
    return price;
  }
}
