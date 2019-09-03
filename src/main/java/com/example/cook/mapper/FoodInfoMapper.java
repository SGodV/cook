package com.example.cook.mapper;


import com.example.cook.dto.Foodcategory;
import com.example.cook.dto.Foodinfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author xudong.zou@hand-china.com
 */
public interface FoodInfoMapper {

    List<Foodinfo> selectAll(@Param("id") Long id,@Param("name") String name);

    Foodinfo selectFoodInfoOne(@Param("foodinfo") Foodinfo foodinfo);

    int insertFoodInfo(@Param("foodinfo") Foodinfo foodinfo);

    int deleteFoodInfoById(@Param("id") Integer id);

    int updateFoodInfo(@Param("foodinfo") Foodinfo foodinfo);

    int selectIsBand(@Param("categoryid") Integer categoryid);

}
