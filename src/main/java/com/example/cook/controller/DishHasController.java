package com.example.cook.controller;

import com.example.cook.dto.Disheva;
import com.example.cook.dto.Dishhas;
import com.example.cook.service.DishEvaService;
import com.example.cook.service.DishHasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


/**
 * @author xudong.zou@hand-china.com
 */
@RestController
public class DishHasController {

    @Autowired
    private DishHasService dishHasService;

    @GetMapping("/dishHas")
    public List<Dishhas> getAllDishHas(@RequestParam(required = true) Long dishId){
        return dishHasService.selectAll(dishId);
    }


}
