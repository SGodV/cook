package com.example.cook.dto;


import javax.persistence.Transient;

public class Foodpur {

  private long id;
  private long foodid;
  private Long num;
  private String status;
  @Transient
  private String foodName;

  public String getFoodName() {
    return foodName;
  }

  public void setFoodName(String foodName) {
    this.foodName = foodName;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public long getFoodid() {
    return foodid;
  }

  public void setFoodid(long foodid) {
    this.foodid = foodid;
  }

  public Long getNum() {
    return num;
  }

  public void setNum(Long num) {
    this.num = num;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

}
