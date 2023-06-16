package com.providerit.demoapi.models;

public class OrderItem {
  private Integer id;
  private Product product;
  private Order order;
  private Integer qty;

  public void setId(Integer id) {
    this.id = id;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public void setQty(Integer qty) {
    this.qty = qty;
  }

  public Integer getId() {
    return id;
  }
  
  public Order getOrder() {
    return order;
  }

  public Product getProduct() {
    return product;
  }
  
  public Integer getQty() {
    return qty;
  }
}
