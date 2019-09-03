package com.example.cook.dto;


import javax.persistence.Transient;

public class Dishhas {

  private Long id;
  private Long dishid;
  private Long foodid;
  @Transient
  private String foodName;

  public String getFoodName() {
    return foodName;
  }

  public void setFoodName(String foodName) {
    this.foodName = foodName;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }


  public Long getDishid() {
    return dishid;
  }

  public void setDishid(Long dishid) {
    this.dishid = dishid;
  }


  public Long getFoodid() {
    return foodid;
  }

  public void setFoodid(Long foodid) {
    this.foodid = foodid;
  }

}
