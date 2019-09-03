package com.example.cook.service;

import com.example.cook.dto.Foodcategory;
import com.example.cook.dto.User;
import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
public interface CategoryService {

    PageInfo<Foodcategory> selectAll(Long id, String name, Integer page, Integer size);

    Foodcategory insertCategory(Foodcategory foodcategory);

    Map deleteCategory(Integer id);

    Foodcategory updateCategory(Foodcategory foodcategory);
}
