package com.example.cook.mapper;


import com.example.cook.dto.Dishinfo;
import com.example.cook.dto.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author xudong.zou@hand-china.com
 */
public interface DishInfoMapper {

    List<Dishinfo> selectAll(@Param("id") Long id,@Param("name") String name);

    Dishinfo selectDishInfoOne(@Param("dishInfo") Dishinfo dishinfo);

    int insertDishInfo(@Param("dishInfo") Dishinfo dishinfo);

    int deleteDishInfoById(Integer id);

    Dishinfo selectById(@Param("id") Long id);
}
