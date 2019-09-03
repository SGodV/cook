package com.example.cook.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author xudong.zou@hand-china.com
 */
@Controller
public class ActionController {

    @GetMapping(value = "/historyScore")
    public String index(){  return "/user/historyScore/historyScore.html";}

    @GetMapping(value = "/professional")
    public String index2(){  return "/user/professional/professionalTwo.html";}

    @GetMapping(value = "/addSunScore")
    public String index3(){  return "user/sunScore/addSunScore/addSunScore.html";}

}
