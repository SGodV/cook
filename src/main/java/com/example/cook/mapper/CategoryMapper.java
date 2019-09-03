package com.example.cook.mapper;


import com.example.cook.dto.Foodcategory;
import com.example.cook.dto.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author xudong.zou@hand-china.com
 */
public interface CategoryMapper {

    List<Foodcategory> selectAll(@Param("id") Long id, @Param("name") String name);

    Foodcategory selectCategoryOne(@Param("category") Foodcategory foodcategory);

    int insertCategory(@Param("category") Foodcategory foodcategory);

    int deleteCategoryById(@Param("id") Integer id);

    int updateCategory(@Param("category") Foodcategory foodcategory);
}
