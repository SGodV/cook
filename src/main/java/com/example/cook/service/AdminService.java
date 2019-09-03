package com.example.cook.service;

import com.example.cook.dto.Admin;
import org.apache.ibatis.annotations.Param;


/**
 * @author xudong.zou@hand-china.com
 */
public interface AdminService {

    Admin login(Admin admin);

    Admin updateAdmin(Admin admin);
}
