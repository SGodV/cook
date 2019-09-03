package com.example.cook.service;

import com.example.cook.dto.Foodinfo;
import com.example.cook.dto.Foodpur;
import com.github.pagehelper.PageInfo;

import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
public interface FoodPurService {

    PageInfo<Foodpur> selectAll(Long id, String name, Integer page, Integer size);

    Foodpur insertFoodPur(Foodpur foodpur);

    Map deleteFoodPur(Integer id);
}
