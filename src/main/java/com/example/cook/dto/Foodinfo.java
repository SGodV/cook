package com.example.cook.dto;


import javax.persistence.Transient;

public class Foodinfo {

  private Long id;
  private Long categoryid;
  private String name;
  private double price;
  private Long num;
  private String desc;
  @Transient
  private String categoryName;

  public String getCategoryName() {
    return categoryName;
  }

  public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public Long getNum() {
    return num;
  }

  public void setNum(Long num) {
    this.num = num;
  }

  public String getDesc() {
    return desc;
  }

  public void setDesc(String desc) {
    this.desc = desc;
  }

  public Long getCategoryid() {
    return categoryid;
  }

  public void setCategoryid(Long categoryid) {
    this.categoryid = categoryid;
  }
}
