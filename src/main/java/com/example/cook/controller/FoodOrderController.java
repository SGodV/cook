package com.example.cook.controller;

import com.example.cook.dto.Dishinfo;
import com.example.cook.dto.Foodorder;
import com.example.cook.service.DishInfoService;
import com.example.cook.service.FoodOrderService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;


/**
 * @author xudong.zou@hand-china.com
 */
@RestController
public class FoodOrderController {

    private static final String DEFAULT_PAGE = "1";
    private static final String DEFAULT_SIZE = "10";

    @Autowired
    private FoodOrderService foodOrderService;

    @GetMapping("/foodOrder")
    public PageInfo<Foodorder> getFoodOrder(@RequestParam(required = false) Long id,
                                           @RequestParam(required = false) String name,
                                           @RequestParam(defaultValue = DEFAULT_PAGE) Integer page,
                                           @RequestParam(defaultValue = DEFAULT_SIZE) Integer size){
        return foodOrderService.selectAll(id,name,page,size);
    }

    @GetMapping("/foodOrder/{userId}")
    public PageInfo<Foodorder> getFoodOrderById(@PathVariable(required = false) Long userId,
                                                @RequestParam(defaultValue = DEFAULT_PAGE) Integer page,
                                                @RequestParam(defaultValue = DEFAULT_SIZE) Integer size){
        return foodOrderService.selectAllByUserId(userId,page,size);
    }

    @PostMapping("/foodOrder")
    public Foodorder insertFoodOrder(@RequestBody @Valid Foodorder foodorder){
        return foodOrderService.insertFoodOrder(foodorder);
    }

    @DeleteMapping("/foodOrder")
    public Map deleteFoodOrder(@RequestParam(required = false) Integer id){
        return foodOrderService.deleteFoodOrder(id);
    }

    @PutMapping("/foodOrder")
    public Foodorder updateFoodOrder(@RequestBody @Valid Foodorder foodorder){
        return foodOrderService.updateFoodOrder(foodorder);
    }

}
