package com.example.cook.dto;


import javax.persistence.Transient;

public class Disheva {

  private Long id;
  private Long dishid;
  private Long user;
  private String content;
  @Transient
  private String userName;

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
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

  public Long getUser() {
    return user;
  }

  public void setUser(Long user) {
    this.user = user;
  }


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

}
