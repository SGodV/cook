package com.example.cook.service;

import com.example.cook.dto.Foodcategory;
import com.example.cook.dto.Foodinfo;
import com.github.pagehelper.PageInfo;

import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
public interface FoodInfoService {

    PageInfo<Foodinfo> selectAll(Long id, String name, Integer page, Integer size);

    Foodinfo insertFoodInfo(Foodinfo foodinfo);

    Map deleteFoodInfo(Integer id);

    Foodinfo updateFoodInfo(Foodinfo foodinfo);
}
