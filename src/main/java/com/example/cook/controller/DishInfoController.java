package com.example.cook.controller;

import com.example.cook.dto.Dishinfo;
import com.example.cook.dto.Foodinfo;
import com.example.cook.dto.User;
import com.example.cook.service.DishInfoService;
import com.example.cook.service.FoodInfoService;
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
public class DishInfoController {

    private static final String DEFAULT_PAGE = "1";
    private static final String DEFAULT_SIZE = "10";

    @Autowired
    private DishInfoService dishInfoService;

    @GetMapping("/dishInfo")
    public PageInfo<Dishinfo> getDishInfo(@RequestParam(required = false) Long id,
                                          @RequestParam(required = false) String name,
                                          @RequestParam(defaultValue = DEFAULT_PAGE) Integer page,
                                          @RequestParam(defaultValue = DEFAULT_SIZE) Integer size){
        return dishInfoService.selectAll(id,name,page,size);
    }

    @GetMapping("/dishInfo/{id}")
    public Dishinfo getDishInfoById(@PathVariable(required = false) Long id){
        return dishInfoService.selectAllById(id);
    }

    @PostMapping("/dishInfo")
    public Dishinfo insertDishInfo(@RequestBody @Valid Dishinfo dishinfo){
        return dishInfoService.insertDishInfo(dishinfo);
    }

    @DeleteMapping("/dishInfo")
    public Map deleteDishInfo(@RequestParam(required = false) Integer id){
        return dishInfoService.deleteDishInfo(id);
    }

    @PutMapping("/dishInfo")
    public Dishinfo updateDishInfo(@RequestBody @Valid Dishinfo dishinfo){
        return dishInfoService.updateDishInfo(dishinfo);
    }

}
