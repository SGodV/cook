package com.example.cook.service.impl;

import com.example.cook.dto.Dishinfo;
import com.example.cook.dto.Dishstep;
import com.example.cook.dto.Foodinfo;
import com.example.cook.dto.User;
import com.example.cook.exception.MyException;
import com.example.cook.mapper.*;
import com.example.cook.service.DishInfoService;
import com.example.cook.service.UserService;
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
public class DishInfoServiceImpl implements DishInfoService {

    @Autowired
    private DishInfoMapper dishInfoMapper;

    @Autowired
    private DishHasMapper dishHasMapper;

    @Autowired
    private DishStepMapper dishStepMapper;

    @Autowired
    private DishEvaMapper dishEvaMapper;

    @Override
    public PageInfo<Dishinfo> selectAll(Long id, String name, Integer page, Integer size) {
        PageHelper.startPage(page,size);
        List<Dishinfo> dishinfos =  dishInfoMapper.selectAll(id,name);
        if (CollectionUtils.isEmpty(dishinfos)){
            throw new MyException("没有数据");
        }
        PageInfo<Dishinfo> pageInfo = new PageInfo<Dishinfo>(dishinfos);
        return pageInfo;
    }

    @Override
    public Dishinfo insertDishInfo(Dishinfo dishinfo) {
        if (CollectionUtils.isEmpty(dishinfo.getHasList()) || StringUtil.isEmpty(dishinfo.getStepDesc())){
            throw new MyException("缺少必要参数");
        }
        if (dishInfoMapper.selectDishInfoOne(dishinfo) != null){
            throw new MyException("已经存在这条数据");
        }
        if (dishInfoMapper.insertDishInfo(dishinfo)<=0){
            throw new MyException("新增数据失败");
        }
        Dishinfo temp = dishInfoMapper.selectDishInfoOne(dishinfo);
        //插入用料
        dishHasMapper.insertDishHas(temp.getId(),dishinfo.getHasList());
        //插入步骤
        dishStepMapper.insertDishStep(temp.getId(),dishinfo.getStepDesc());
        return temp;
    }

    @Override
    public Map deleteDishInfo(Integer id) {
        if (id == null){
            throw new MyException("参数id不能为空");
        }
        if (dishInfoMapper.deleteDishInfoById(id)<=0){
            throw new MyException("删除数据失败");
        }
        //删除用料
        dishHasMapper.deleteDishHas(id);
        //删除步骤
        dishStepMapper.deleteDishStep(id);
        //删除评价
        dishEvaMapper.deleteDishEva(id);
        Map map = new HashMap();
        map.put("message", "success");
        return map;
    }

    @Override
    public Dishinfo updateDishInfo(Dishinfo dishinfo) {
        return null;
    }

    @Override
    public Dishinfo selectAllById(Long id) {
        Dishinfo dishinfo =  dishInfoMapper.selectById(id);
        if (dishinfo == null){
            throw new MyException("没有数据");
        }
        return dishinfo;
    }
}
