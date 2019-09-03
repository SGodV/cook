package com.example.cook.mapper;


import com.example.cook.dto.Dishhas;
import com.example.cook.dto.Foodinfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author xudong.zou@hand-china.com
 */
public interface DishHasMapper {

    int insertDishHas(@Param("dishId") Long dishId,@Param("foodList") List<Long> foodList);

    int deleteDishHas(@Param("id") Integer id);

    List<Dishhas> selectAll(@Param("dishId") Long dishId);
}
