package com.example.cook.service.impl;

import com.example.cook.dto.User;
import com.example.cook.exception.MyException;
import com.example.cook.mapper.UserMapper;
import com.example.cook.service.UserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xudong.zou@hand-china.com
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;


    @Override
    public User login(User user) {
        if (user == null || user.getUsername() == null){
            throw new MyException("缺失参数");
        }
        User tempUser = userMapper.selectUser(user);
        if (tempUser == null){
            throw new MyException("用户名密码错误");
        }
        return tempUser;
    }

    @Override
    public PageInfo<User> selectAll(Long id, String name, Integer page, Integer size) {
        PageHelper.startPage(page,size);
        List<User> users =  userMapper.selectAll(id,name);
        if (CollectionUtils.isEmpty(users)){
            throw new MyException("没有数据");
        }
        PageInfo<User> pageInfo = new PageInfo<User>(users);
        return pageInfo;
    }

    @Override
    public User insertUser(User user) {
        if (userMapper.selectUserOne(user) != null){
            throw new MyException("已经存在这条数据");
        }
        if (userMapper.insertUser(user)<=0){
            throw new MyException("新增数据失败");
        }
        return userMapper.selectUserOne(user);
    }

    @Override
    public Map deleteUser(Integer id) {
        if (id == null){
            throw new MyException("参数id不能为空");
        }
        if (userMapper.deleteUserById(id)<=0){
            throw new MyException("删除数据失败");
        }
        Map map = new HashMap();
        map.put("message", "success");
        return map;
    }

    @Override
    public Map deleteuserList(List<Integer> ids) {
        if (CollectionUtils.isEmpty(ids)){
            throw new MyException("参数ids不能为空");
        }
        int i = userMapper.deleteuserByIds(ids);
        if (i!=ids.size()){
            throw new MyException("删除数据失败");
        }
        Map map = new HashMap();
        map.put("message", "success");
        return map;
    }

    @Override
    public User updateUser(User user) {
        User u = userMapper.selectUserOne(user);
        if (u != null && u.getId()!=user.getId()){
            throw new MyException("已经存在这条数据");
        }
        userMapper.updateUser(user);
        return userMapper.selectUserOne(user);
    }

    @Override
    public User updateUserPass(User user) {
        User u = userMapper.selectUserOne(user);
        if (u != null && u.getId()!=user.getId()){
            throw new MyException("已经存在这条数据");
        }
        userMapper.updateUserPass(user);
        return userMapper.selectUserOne(user);
    }
}
