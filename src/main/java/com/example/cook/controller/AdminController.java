package com.example.cook.controller;

import com.example.cook.dto.Admin;
import com.example.cook.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


/**
 * @author xudong.zou@hand-china.com
 */
@RestController
public class AdminController {

    private static final String DEFAULT_PAGE = "1";
    private static final String DEFAULT_SIZE = "10";

    @Autowired
    private AdminService adminService;

    @PostMapping("/loginAdmin")
    public Admin login(@RequestBody Admin admin) {
        return adminService.login(admin);
    }

    @PutMapping("/admin")
    public Admin updateUser(@RequestBody @Valid Admin admin){
        return adminService.updateAdmin(admin);
    }

}
