package com.example.cook.service;

import com.example.cook.dto.Dishinfo;
import com.example.cook.dto.User;
import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
public interface DishInfoService {

    PageInfo<Dishinfo> selectAll(Long id, String name, Integer page, Integer size);

    Dishinfo insertDishInfo(Dishinfo dishinfo);

    Map deleteDishInfo(Integer id);

    Dishinfo updateDishInfo(Dishinfo dishinfo);

    Dishinfo selectAllById(Long id);
}
