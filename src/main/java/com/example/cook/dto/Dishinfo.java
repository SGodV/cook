package com.example.cook.dto;


import javax.persistence.Transient;
import java.util.List;

public class Dishinfo {
    private Long id;
    private String name;
    private Long userid;
    private String desc;
    @Transient
    private String userName;
    //用料主键
    @Transient
    private List<Long> hasList;
    //评价用户id
    @Transient
    private Long evaId;
    //评价内容
    @Transient
    private String content;
    //步骤描述
    @Transient
    private String stepDesc;

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

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<Long> getHasList() {
        return hasList;
    }

    public void setHasList(List<Long> hasList) {
        this.hasList = hasList;
    }

    public Long getEvaId() {
        return evaId;
    }

    public void setEvaId(Long evaId) {
        this.evaId = evaId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStepDesc() {
        return stepDesc;
    }

    public void setStepDesc(String stepDesc) {
        this.stepDesc = stepDesc;
    }
}
