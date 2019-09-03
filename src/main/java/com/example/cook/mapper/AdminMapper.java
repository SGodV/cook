package com.example.cook.mapper;


import com.example.cook.dto.Admin;
import com.example.cook.dto.User;
import org.apache.ibatis.annotations.Param;

/**
 * @author xudong.zou@hand-china.com
 */
public interface AdminMapper {

    Admin selectAdmin(@Param("admin") Admin admin);

    int updateAdmin(@Param("admin") Admin admin);

    Admin selectAdminOne(@Param("admin") Admin admin);

}
