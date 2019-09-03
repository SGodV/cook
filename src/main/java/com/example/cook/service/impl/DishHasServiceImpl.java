package com.example.cook.service.impl;

import com.example.cook.dto.Disheva;
import com.example.cook.dto.Dishhas;
import com.example.cook.exception.MyException;
import com.example.cook.mapper.DishEvaMapper;
import com.example.cook.mapper.DishHasMapper;
import com.example.cook.service.DishEvaService;
import com.example.cook.service.DishHasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * @author xudong.zou@hand-china.com
 */
@Service
public class DishHasServiceImpl implements DishHasService {

    @Autowired
    private DishHasMapper dishHasMapper;

    @Override
    public List<Dishhas> selectAll(Long dishId) {
        List<Dishhas> dishhas =  dishHasMapper.selectAll(dishId);
        if (CollectionUtils.isEmpty(dishhas)){
            throw new MyException("没有数据");
        }
        return dishhas;
    }
}
