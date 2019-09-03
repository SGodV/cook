package com.example.cook.controller;

import com.example.cook.dto.Foodcategory;
import com.example.cook.dto.User;
import com.example.cook.service.CategoryService;
import com.example.cook.service.UserService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
@RestController
public class CategoryController {

    private static final String DEFAULT_PAGE = "1";
    private static final String DEFAULT_SIZE = "10";

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/category")
    public PageInfo<Foodcategory> getCategory(@RequestParam(required = false) Long id,
                                    @RequestParam(required = false) String name,
                                    @RequestParam(defaultValue = DEFAULT_PAGE) Integer page,
                                    @RequestParam(defaultValue = DEFAULT_SIZE) Integer size){
        return categoryService.selectAll(id,name,page,size);
    }

    @PostMapping("/category")
    public Foodcategory insertCategory(@RequestBody @Valid Foodcategory foodcategory){
        return categoryService.insertCategory(foodcategory);
    }

    @DeleteMapping("/category")
    public Map deleteCategory(@RequestParam(required = false) Integer id){
        return categoryService.deleteCategory(id);
    }

    @PutMapping("/category")
    public Foodcategory updateCategory(@RequestBody @Valid Foodcategory foodcategory){
        return categoryService.updateCategory(foodcategory);
    }

}
