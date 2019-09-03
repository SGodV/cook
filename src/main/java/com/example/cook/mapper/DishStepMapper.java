package com.example.cook.mapper;


import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author xudong.zou@hand-china.com
 */
public interface DishStepMapper {

    int insertDishStep(@Param("dishId") Long dishId, @Param("desc") String desc);

    int deleteDishStep(@Param("id") Integer id);
}
