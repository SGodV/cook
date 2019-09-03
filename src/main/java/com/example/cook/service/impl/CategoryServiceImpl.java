package com.example.cook.service.impl;

import com.example.cook.dto.Foodcategory;
import com.example.cook.exception.MyException;
import com.example.cook.mapper.CategoryMapper;
import com.example.cook.mapper.FoodInfoMapper;
import com.example.cook.service.CategoryService;
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
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private FoodInfoMapper foodInfoMapper;


    @Override
    public PageInfo<Foodcategory> selectAll(Long id, String name, Integer page, Integer size) {
        PageHelper.startPage(page,size);
        List<Foodcategory> foodcategories =  categoryMapper.selectAll(id,name);
        if (CollectionUtils.isEmpty(foodcategories)){
            throw new MyException("没有数据");
        }
        PageInfo<Foodcategory> pageInfo = new PageInfo<Foodcategory>(foodcategories);
        return pageInfo;
    }

    @Override
    public Foodcategory insertCategory(Foodcategory foodcategory) {
        if (categoryMapper.selectCategoryOne(foodcategory) != null){
            throw new MyException("已经存在这条数据");
        }
        if (categoryMapper.insertCategory(foodcategory)<=0){
            throw new MyException("新增数据失败");
        }
        return categoryMapper.selectCategoryOne(foodcategory);
    }

    @Override
    public Map deleteCategory(Integer id) {
        if (id == null){
            throw new MyException("参数id不能为空");
        }
        if (foodInfoMapper.selectIsBand(id)>0){
            throw new MyException("已绑定食材，不能删除");
        }
        if (categoryMapper.deleteCategoryById(id)<=0){
            throw new MyException("删除数据失败");
        }
        Map map = new HashMap();
        map.put("message", "success");
        return map;
    }

    @Override
    public Foodcategory updateCategory(Foodcategory foodcategory) {
        Foodcategory f = categoryMapper.selectCategoryOne(foodcategory);
        if (f != null && f.getId()!=foodcategory.getId()){
            throw new MyException("已经存在这条数据");
        }
        categoryMapper.updateCategory(foodcategory);
        return categoryMapper.selectCategoryOne(foodcategory);
    }

}
