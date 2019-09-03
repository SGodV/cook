package com.example.cook.service.impl;

import com.example.cook.dto.Foodinfo;
import com.example.cook.dto.Foodpur;
import com.example.cook.exception.MyException;
import com.example.cook.mapper.FoodInfoMapper;
import com.example.cook.mapper.FoodPurMapper;
import com.example.cook.service.FoodInfoService;
import com.example.cook.service.FoodPurService;
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
public class FoodPurServiceImpl implements FoodPurService {

    @Autowired
    private FoodPurMapper foodPurMapper;

    @Override
    public PageInfo<Foodpur> selectAll(Long id, String name, Integer page, Integer size) {
        PageHelper.startPage(page,size);
        List<Foodpur> foodpurs =  foodPurMapper.selectAll(id,name);
        if (CollectionUtils.isEmpty(foodpurs)){
            throw new MyException("没有数据");
        }
        PageInfo<Foodpur> pageInfo = new PageInfo<Foodpur>(foodpurs);
        return pageInfo;
    }

    @Override
    public Foodpur insertFoodPur(Foodpur foodpur) {
        if (foodPurMapper.insertFoodPur(foodpur)<=0){
            throw new MyException("新增数据失败");
        }
        return foodpur;
    }

    @Override
    public Map deleteFoodPur(Integer id) {
        if (id == null){
            throw new MyException("参数id不能为空");
        }
        if (foodPurMapper.deleteFoodPurById(id)<=0){
            throw new MyException("删除数据失败");
        }
        Map map = new HashMap();
        map.put("message", "success");
        return map;
    }
}
