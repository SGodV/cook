package com.example.cook;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.cook.mapper")
public class CookApplication {

    public static void main(String[] args) {
        SpringApplication.run(CookApplication.class, args);
    }

}
