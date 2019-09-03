package com.example.cook.mapper;


import com.example.cook.dto.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author xudong.zou@hand-china.com
 */
public interface UserMapper {

    List<User> selectAllUser();

    User selectUser(@Param("user") User user);

    List<User> selectAll(@Param("id") Long id, @Param("name") String name);

    User selectUserOne(@Param("user") User user);

    int insertUser(@Param("user") User user);

    int deleteUserById(@Param("id") Integer id);

    int deleteuserByIds(@Param("ids") List<Integer> ids);

    int updateUser(@Param("user") User user);

    int updateUserPass(@Param("user") User user);
}
