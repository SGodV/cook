package com.example.cook.mapper;


import com.example.cook.dto.Disheva;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author xudong.zou@hand-china.com
 */
public interface DishEvaMapper {

    int deleteDishEva(@Param("id") Integer id);

    List<Disheva> selectAll(@Param("dishId") Long dishId);

    int insertDishEva(@Param("dishEva") Disheva disheva);
}
