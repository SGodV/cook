package com.example.cook.controller;

import com.example.cook.dto.Foodinfo;
import com.example.cook.dto.Foodpur;
import com.example.cook.service.FoodInfoService;
import com.example.cook.service.FoodPurService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
@RestController
public class FoodPurController {

    private static final String DEFAULT_PAGE = "1";
    private static final String DEFAULT_SIZE = "10";

    @Autowired
    private FoodPurService foodPurService;

    @GetMapping("/foodPur")
    public PageInfo<Foodpur> getFoodPur(@RequestParam(required = false) Long id,
                                        @RequestParam(required = false) String name,
                                        @RequestParam(defaultValue = DEFAULT_PAGE) Integer page,
                                        @RequestParam(defaultValue = DEFAULT_SIZE) Integer size){
        return foodPurService.selectAll(id,name,page,size);
    }

    @PostMapping("/foodPur")
    public Foodpur insertFoodPur(@RequestBody @Valid Foodpur foodpur){
        return foodPurService.insertFoodPur(foodpur);
    }

    @DeleteMapping("/foodPur")
    public Map deleteFoodPur(@RequestParam(required = false) Integer id){
        return foodPurService.deleteFoodPur(id);
    }


}
