package com.example.cook.service.impl;

import com.example.cook.dto.Admin;
import com.example.cook.dto.User;
import com.example.cook.exception.MyException;
import com.example.cook.mapper.AdminMapper;
import com.example.cook.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author xudong.zou@hand-china.com
 */
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;


    @Override
    public Admin login(Admin admin) {
        if (admin == null || admin.getUsername() == null){
            throw new MyException("缺失参数");
        }
        Admin tempAdmin = adminMapper.selectAdmin(admin);
        if (tempAdmin == null){
            throw new MyException("用户名密码错误");
        }
        return tempAdmin;
    }

    @Override
    public Admin updateAdmin(Admin admin) {
        Admin a = adminMapper.selectAdminOne(admin);
        if (a != null && a.getId()!=admin.getId()){
            throw new MyException("已经存在这条数据");
        }
        adminMapper.updateAdmin(admin);
        return adminMapper.selectAdminOne(admin);
    }
}
