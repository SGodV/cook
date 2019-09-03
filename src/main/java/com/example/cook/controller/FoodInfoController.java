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
public class FoodInfoController {

    private static final String DEFAULT_PAGE = "1";
    private static final String DEFAULT_SIZE = "10";

    @Autowired
    private FoodInfoService foodInfoService;

    @GetMapping("/foodInfo")
    public PageInfo<Foodinfo> getFoodInfo(@RequestParam(required = false) Long id,
                                          @RequestParam(required = false) String name,
                                          @RequestParam(defaultValue = DEFAULT_PAGE) Integer page,
                                          @RequestParam(defaultValue = DEFAULT_SIZE) Integer size){
        return foodInfoService.selectAll(id,name,page,size);
    }

    @PostMapping("/foodInfo")
    public Foodinfo insertFoodInfo(@RequestBody @Valid Foodinfo foodinfo){
        return foodInfoService.insertFoodInfo(foodinfo);
    }

    @DeleteMapping("/foodInfo")
    public Map deleteFoodInfo(@RequestParam(required = false) Integer id){
        return foodInfoService.deleteFoodInfo(id);
    }

    @PutMapping("/foodInfo")
    public Foodinfo updateFoodInfo(@RequestBody @Valid Foodinfo foodinfo){
        return foodInfoService.updateFoodInfo(foodinfo);
    }

}
