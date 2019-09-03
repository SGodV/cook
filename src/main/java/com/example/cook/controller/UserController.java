package com.example.cook.controller;

import com.example.cook.dto.User;
import com.example.cook.service.UserService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
@RestController
public class UserController {

    private static final String DEFAULT_PAGE = "1";
    private static final String DEFAULT_SIZE = "10";

    @Autowired
    private UserService userService;


    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user);
    }

    @GetMapping("/user")
    public PageInfo<User> getUser(@RequestParam(required = false) Long id,
                                    @RequestParam(required = false) String name,
                                    @RequestParam(defaultValue = DEFAULT_PAGE) Integer page,
                                    @RequestParam(defaultValue = DEFAULT_SIZE) Integer size){
        return userService.selectAll(id,name,page,size);
    }

    @PostMapping("/user")
    public User insertUser(@RequestBody @Valid User user){
        return userService.insertUser(user);
    }

    @DeleteMapping("/user")
    public Map deleteUser(@RequestParam(required = false) Integer id){
        return userService.deleteUser(id);
    }

    @DeleteMapping("/userList")
    public Map deleteUserList(@RequestBody List<Integer> ids){
        return userService.deleteuserList(ids);
    }

    @PutMapping("/user")
    public User updateUser(@RequestBody @Valid User user){
        return userService.updateUser(user);
    }

    @PutMapping("/userPass")
    public User updateUserPass(@RequestBody @Valid User user){
        return userService.updateUserPass(user);
    }

}
