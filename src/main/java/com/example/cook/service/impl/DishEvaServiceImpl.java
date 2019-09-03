package com.example.cook.service.impl;

import com.example.cook.dto.Disheva;
import com.example.cook.dto.Dishinfo;
import com.example.cook.exception.MyException;
import com.example.cook.mapper.DishEvaMapper;
import com.example.cook.mapper.DishHasMapper;
import com.example.cook.mapper.DishInfoMapper;
import com.example.cook.mapper.DishStepMapper;
import com.example.cook.service.DishEvaService;
import com.example.cook.service.DishInfoService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.StringUtil;
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
public class DishEvaServiceImpl implements DishEvaService {

    @Autowired
    private DishEvaMapper dishEvaMapper;

    @Override
    public List<Disheva> selectAll(Long dishId) {
        List<Disheva> dishevas =  dishEvaMapper.selectAll(dishId);
        if (CollectionUtils.isEmpty(dishevas)){
            throw new MyException("没有数据");
        }
        return dishevas;
    }

    @Override
    public Disheva insertDishEva(Disheva disheva) {
        if (dishEvaMapper.insertDishEva(disheva)<=0){
            throw new MyException("新增数据失败");
        }
        return disheva;
    }
}
