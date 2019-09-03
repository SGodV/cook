package com.example.cook.service;

import com.example.cook.dto.Foodorder;
import com.github.pagehelper.PageInfo;

import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
public interface FoodOrderService {

    PageInfo<Foodorder> selectAll(Long id, String name, Integer page, Integer size);

    PageInfo<Foodorder> selectAllByUserId(Long id, Integer page, Integer size);

    Foodorder insertFoodOrder(Foodorder foodorder);

    Map deleteFoodOrder(Integer id);

    Foodorder updateFoodOrder(Foodorder foodorder);
}
