package com.example.cook.service.impl;

import com.example.cook.dto.Foodinfo;
import com.example.cook.dto.Foodorder;
import com.example.cook.exception.MyException;
import com.example.cook.mapper.*;
import com.example.cook.service.FoodOrderService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xudong.zou@hand-china.com
 */
@Service
public class FoodOrderServiceImpl implements FoodOrderService {

    @Autowired
    private FoodOrderMapper foodOrderMapper;

    @Override
    public PageInfo<Foodorder> selectAll(Long id, String name, Integer page, Integer size) {
        PageHelper.startPage(page,size);
        List<Foodorder> foodorders =  foodOrderMapper.selectAll(id,name);
        if (CollectionUtils.isEmpty(foodorders)){
            throw new MyException("没有数据");
        }
        PageInfo<Foodorder> pageInfo = new PageInfo<Foodorder>(foodorders);
        return pageInfo;
    }

    @Override
    public PageInfo<Foodorder> selectAllByUserId(Long id, Integer page, Integer size) {
        PageHelper.startPage(page,size);
        List<Foodorder> foodorders =  foodOrderMapper.selectByUserId(id);
        if (CollectionUtils.isEmpty(foodorders)){
            throw new MyException("没有数据");
        }
        PageInfo<Foodorder> pageInfo = new PageInfo<Foodorder>(foodorders);
        return pageInfo;
    }

    @Override
    public Foodorder insertFoodOrder(Foodorder foodorder) {
        if (foodOrderMapper.insertFoodOrder(foodorder)<=0){
            throw new MyException("新增数据失败");
        }
        return foodorder;
    }

    @Override
    public Map deleteFoodOrder(Integer id) {
        if (id == null){
            throw new MyException("参数id不能为空");
        }
        if (foodOrderMapper.deleteFoodOrderById(id)<=0){
            throw new MyException("删除数据失败");
        }
        Map map = new HashMap();
        map.put("message", "success");
        return map;
    }

    @Override
    public Foodorder updateFoodOrder(Foodorder foodorder) {
        foodOrderMapper.updateFoodOrder(foodorder);
        return foodorder;
    }
}
