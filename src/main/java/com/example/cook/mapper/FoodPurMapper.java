package com.example.cook.mapper;


import com.example.cook.dto.Foodinfo;
import com.example.cook.dto.Foodpur;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author xudong.zou@hand-china.com
 */
public interface FoodPurMapper {

    List<Foodpur> selectAll(@Param("id") Long id,@Param("name") String name);

    int insertFoodPur(@Param("foodPur") Foodpur foodpur);

    int deleteFoodPurById(@Param("id") Integer id);
}
