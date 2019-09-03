package com.example.cook.service;

import com.example.cook.dto.User;
import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
public interface UserService {

    User login(User user);

    PageInfo<User> selectAll(Long id, String name, Integer page, Integer size);

    User insertUser(User user);

    Map deleteUser(Integer id);

    Map deleteuserList(List<Integer> ids);

    User updateUser(User user);

    User updateUserPass(User user);
}
