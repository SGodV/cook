package com.example.cook.service.impl;

import com.example.cook.dto.Foodcategory;
import com.example.cook.dto.Foodinfo;
import com.example.cook.exception.MyException;
import com.example.cook.mapper.CategoryMapper;
import com.example.cook.mapper.FoodInfoMapper;
import com.example.cook.service.CategoryService;
import com.example.cook.service.FoodInfoService;
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
public class FoodInfoServiceImpl implements FoodInfoService {

    @Autowired
    private FoodInfoMapper foodInfoMapper;

    @Override
    public PageInfo<Foodinfo> selectAll(Long id, String name, Integer page, Integer size) {
        PageHelper.startPage(page,size);
        List<Foodinfo> foodinfos =  foodInfoMapper.selectAll(id,name);
        if (CollectionUtils.isEmpty(foodinfos)){
            throw new MyException("没有数据");
        }
        PageInfo<Foodinfo> pageInfo = new PageInfo<Foodinfo>(foodinfos);
        return pageInfo;
    }

    @Override
    public Foodinfo insertFoodInfo(Foodinfo foodinfo) {
        if (foodInfoMapper.selectFoodInfoOne(foodinfo) != null){
            throw new MyException("已经存在这条数据");
        }
        if (foodInfoMapper.insertFoodInfo(foodinfo)<=0){
            throw new MyException("新增数据失败");
        }
        return foodInfoMapper.selectFoodInfoOne(foodinfo);
    }

    @Override
    public Map deleteFoodInfo(Integer id) {
        if (id == null){
            throw new MyException("参数id不能为空");
        }
        if (foodInfoMapper.deleteFoodInfoById(id)<=0){
            throw new MyException("删除数据失败");
        }
        Map map = new HashMap();
        map.put("message", "success");
        return map;
    }

    @Override
    public Foodinfo updateFoodInfo(Foodinfo foodinfo) {
        Foodinfo u = foodInfoMapper.selectFoodInfoOne(foodinfo);
        if (u != null && u.getId()!=foodinfo.getId()){
            throw new MyException("已经存在这条数据");
        }
        foodInfoMapper.updateFoodInfo(foodinfo);
        return foodInfoMapper.selectFoodInfoOne(foodinfo);
    }
}
