package com.example.cook.controller;

import com.example.cook.dto.Disheva;
import com.example.cook.dto.Dishinfo;
import com.example.cook.service.DishEvaService;
import com.example.cook.service.DishInfoService;
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
public class DishEvaController {

    @Autowired
    private DishEvaService dishEvaService;

    @GetMapping("/dishEva")
    public List<Disheva> getDishEva(@RequestParam(required = true) Long dishId){
        return dishEvaService.selectAll(dishId);
    }

    @PostMapping("/dishEva")
    public Disheva insertDishEva(@RequestBody @Valid Disheva disheva){
        return dishEvaService.insertDishEva(disheva);
    }

}
