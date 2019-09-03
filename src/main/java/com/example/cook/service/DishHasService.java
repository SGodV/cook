package com.example.cook.service;

import com.example.cook.dto.Disheva;
import com.example.cook.dto.Dishhas;

import java.util.List;


/**
 * @author xudong.zou@hand-china.com
 */
public interface DishHasService {

    List<Dishhas> selectAll(Long dishId);

}
