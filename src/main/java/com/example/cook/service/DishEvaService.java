package com.example.cook.service;

import com.example.cook.dto.Disheva;
import com.example.cook.dto.Dishinfo;
import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
public interface DishEvaService {

    List<Disheva> selectAll(Long dishId);

    Disheva insertDishEva(Disheva disheva);
}
