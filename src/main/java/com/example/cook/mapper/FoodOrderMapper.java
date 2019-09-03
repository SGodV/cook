package com.example.cook.mapper;


import com.example.cook.dto.Foodinfo;
import com.example.cook.dto.Foodorder;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author xudong.zou@hand-china.com
 */
public interface FoodOrderMapper {

    List<Foodorder> selectAll(@Param("id") Long id,@Param("name") String name);

    List<Foodorder> selectByUserId(@Param("userId") Long id);

    int insertFoodOrder(@Param("foodOrder") Foodorder foodorder);

    int deleteFoodOrderById(@Param("id") Integer id);

    int updateFoodOrder(@Param("foodOrder") Foodorder foodorder);
}
